import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import connectDB from '@/lib/mongodb'
import BackgroundVideo from '@/models/BackgroundVideo'
import { verifyToken } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { isActive, category, tags } = await request.json()

    const updateData: any = {}
    if (typeof isActive === 'boolean') updateData.isActive = isActive
    if (category) updateData.category = category
    if (tags) updateData.tags = tags

    const video = await BackgroundVideo.findOneAndUpdate(
      { _id: params.id, userId: payload.userId },
      updateData,
      { new: true }
    )

    if (!video) {
      return NextResponse.json({ message: 'Vídeo não encontrado' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Vídeo atualizado com sucesso',
      video
    })

  } catch (error) {
    console.error('Erro ao atualizar vídeo:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const video = await BackgroundVideo.findOne({
      _id: params.id,
      userId: payload.userId
    })

    if (!video) {
      return NextResponse.json({ message: 'Vídeo não encontrado' }, { status: 404 })
    }

    // Deletar arquivo físico
    try {
      await unlink(video.path)
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error)
      // Continuar mesmo se não conseguir deletar o arquivo
    }

    // Deletar do banco de dados
    await BackgroundVideo.findByIdAndDelete(params.id)

    return NextResponse.json({
      message: 'Vídeo excluído com sucesso'
    })

  } catch (error) {
    console.error('Erro ao excluir vídeo:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

