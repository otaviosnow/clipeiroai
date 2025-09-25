import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { verifyPassword, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email, password } = await request.json()

    // Buscar usuário
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { message: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Verificar senha
    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Email ou senha incorretos' },
        { status: 401 }
      )
    }

    // Gerar token JWT
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email
    })

    // Retornar dados do usuário (sem senha)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isEmailVerified: user.isEmailVerified,
      socialAccounts: user.socialAccounts
    }

    // Criar resposta com cookie
    const response = NextResponse.json(
      { 
        message: 'Login realizado com sucesso',
        user: userData 
      },
      { status: 200 }
    )

    // Definir cookie HTTP-only
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 dias
    })

    return response

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

