import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import connectDB from '@/lib/mongodb'
import BackgroundVideo from '@/models/BackgroundVideo'
import { verifyToken } from '@/lib/auth'
import ffmpeg from 'fluent-ffmpeg'

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: 'Token inválido' }, { status: 401 })
    }

    await connectDB()

    const videos = await BackgroundVideo.find({ userId: payload.userId })
      .sort({ createdAt: -1 })

    return NextResponse.json({ videos })

  } catch (error) {
    console.error('Erro ao buscar vídeos:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: 'Token inválido' }, { status: 401 })
    }

    await connectDB()

    const formData = await request.formData()
    const file = formData.get('video') as File
    const category = formData.get('category') as string

    if (!file) {
      return NextResponse.json({ message: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    // Criar diretório de uploads se não existir
    const uploadsDir = join(process.cwd(), 'uploads', 'backgrounds')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Gerar nome único para o arquivo
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`
    const filePath = join(uploadsDir, fileName)

    // Salvar arquivo
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Obter informações do vídeo usando FFmpeg
    const videoInfo = await getVideoInfo(filePath)

    // Salvar no banco de dados
    const backgroundVideo = new BackgroundVideo({
      userId: payload.userId,
      filename: fileName,
      originalName: file.name,
      path: filePath,
      duration: videoInfo.duration,
      size: file.size,
      format: fileExtension || 'mp4',
      category: category || 'geral',
      tags: [],
      isActive: true
    })

    await backgroundVideo.save()

    return NextResponse.json({
      message: 'Vídeo de fundo salvo com sucesso',
      video: backgroundVideo
    })

  } catch (error) {
    console.error('Erro no upload:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

async function getVideoInfo(filePath: string): Promise<{ duration: number }> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        reject(err)
        return
      }
      
      const duration = metadata.format.duration || 0
      resolve({ duration })
    })
  })
}

