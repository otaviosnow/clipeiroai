import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { verifyToken } from '@/lib/auth'
import { DEV_MODE, MOCK_USER } from '@/lib/dev-mode'

export async function GET(request: NextRequest) {
  try {
    // Modo de desenvolvimento - retornar dados mock
    if (DEV_MODE) {
      return NextResponse.json({ user: MOCK_USER }, { status: 200 })
    }

    await connectDB()

    // Obter token do cookie
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { message: 'Token não encontrado' },
        { status: 401 }
      )
    }

    // Verificar token
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      )
    }

    // Buscar usuário
    const user = await User.findById(payload.userId)
    if (!user) {
      return NextResponse.json(
        { message: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    // Retornar dados do usuário (sem senha)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isEmailVerified: user.isEmailVerified,
      socialAccounts: user.socialAccounts
    }

    return NextResponse.json({ user: userData }, { status: 200 })

  } catch (error) {
    console.error('Erro ao verificar usuário:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
