import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import connectDB from '@/lib/mongodb'
import Video from '@/models/Video'
import { verifyToken } from '@/lib/auth'
import ffmpeg from 'fluent-ffmpeg'

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

    if (!file) {
      return NextResponse.json({ message: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    // Criar diretório de uploads se não existir
    const uploadsDir = join(process.cwd(), 'uploads', 'videos')
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
    const video = new Video({
      userId: payload.userId,
      originalVideo: {
        filename: fileName,
        path: filePath,
        duration: videoInfo.duration,
        size: file.size,
        format: fileExtension || 'mp4'
      },
      status: 'uploading'
    })

    await video.save()

    // Iniciar processamento em background
    processVideo(video._id.toString(), filePath, videoInfo.duration)

    return NextResponse.json({
      message: 'Vídeo enviado com sucesso',
      videoId: video._id,
      duration: videoInfo.duration
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

async function processVideo(videoId: string, filePath: string, duration: number) {
  try {
    await connectDB()
    
    // Atualizar status para processando
    await Video.findByIdAndUpdate(videoId, { status: 'processing' })

    // Aqui será implementada a lógica de geração dos 10 formatos
    // Por enquanto, vamos simular o processamento
    
    const formats = [
      'split-screen-top',
      'split-screen-bottom', 
      'zoom-focus',
      'caption-style-1',
      'caption-style-2',
      'border-effect',
      'overlay-text',
      'highlight-clip',
      'slow-motion',
      'fast-motion'
    ]

    const generatedClips = formats.map((format, index) => ({
      id: `${videoId}-${index}`,
      format,
      filename: `${videoId}-${format}.mp4`,
      path: filePath, // Temporário
      thumbnail: '', // Será gerado
      duration,
      status: 'processing' as const
    }))

    // Atualizar vídeo com os clipes gerados
    await Video.findByIdAndUpdate(videoId, {
      generatedClips,
      status: 'completed'
    })

    console.log(`Vídeo ${videoId} processado com sucesso`)

  } catch (error) {
    console.error('Erro no processamento:', error)
    await Video.findByIdAndUpdate(videoId, { status: 'failed' })
  }
}

