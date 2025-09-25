import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ScheduledPost from '@/models/ScheduledPost'
import { verifyToken } from '@/lib/auth'

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

    const { clipId, accounts, scheduledFor, caption, hashtags } = await request.json()

    if (!clipId || !accounts || accounts.length === 0 || !scheduledFor) {
      return NextResponse.json(
        { message: 'Dados obrigatórios não fornecidos' },
        { status: 400 }
      )
    }

    const scheduledDateTime = new Date(scheduledFor)
    if (scheduledDateTime < new Date()) {
      return NextResponse.json(
        { message: 'A data deve ser no futuro' },
        { status: 400 }
      )
    }

    // Criar posts agendados para cada conta
    const scheduledPosts = []
    
    for (const accountId of accounts) {
      // Aqui você precisaria buscar os dados da conta para determinar a plataforma
      // Por simplicidade, vamos assumir que você tem essa informação
      const platform = 'tiktok' // Isso deveria vir dos dados da conta
      const accountName = 'Conta' // Isso também deveria vir dos dados da conta

      const scheduledPost = new ScheduledPost({
        userId: payload.userId,
        videoId: clipId.split('-')[0], // Assumindo que clipId contém o videoId
        clipId,
        platform,
        accountId,
        accountName,
        scheduledFor: scheduledDateTime,
        postData: {
          caption,
          hashtags
        }
      })

      scheduledPosts.push(scheduledPost)
    }

    await ScheduledPost.insertMany(scheduledPosts)

    return NextResponse.json({
      message: 'Posts agendados com sucesso',
      count: scheduledPosts.length
    })

  } catch (error) {
    console.error('Erro ao agendar posts:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

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

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const query: any = { userId: payload.userId }
    if (status) {
      query.status = status
    }

    const scheduledPosts = await ScheduledPost.find(query)
      .sort({ scheduledFor: 1 })
      .limit(50)

    return NextResponse.json({ posts: scheduledPosts })

  } catch (error) {
    console.error('Erro ao buscar posts agendados:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

