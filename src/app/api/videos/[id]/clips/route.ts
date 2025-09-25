import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Video from '@/models/Video'
import { verifyToken } from '@/lib/auth'
import { DEV_MODE, MOCK_CLIPS } from '@/lib/dev-mode'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Modo de desenvolvimento - retornar dados mock
    if (DEV_MODE) {
      return NextResponse.json({
        clips: MOCK_CLIPS,
        status: 'completed'
      })
    }

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

    const video = await Video.findOne({
      _id: params.id,
      userId: payload.userId
    })

    if (!video) {
      return NextResponse.json({ message: 'Vídeo não encontrado' }, { status: 404 })
    }

    return NextResponse.json({
      clips: video.generatedClips,
      status: video.status
    })

  } catch (error) {
    console.error('Erro ao buscar clipes:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
