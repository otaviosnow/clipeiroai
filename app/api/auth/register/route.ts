import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { name, email, password } = body

    console.log('📝 Registration attempt:', { name, email })

    // Validações básicas
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Nome, email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      )
    }

    // Verificar se usuário já existe
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Este email já está cadastrado' },
        { status: 409 }
      )
    }

    // Criar novo usuário
    const user = new User({
      name,
      email,
      password
    })

    await user.save()

    console.log('✅ User registered successfully:', user.email)

    // Retornar dados do usuário (sem senha)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      createdAt: user.createdAt
    }

    return NextResponse.json({
      success: true,
      message: 'Usuário cadastrado com sucesso',
      user: userResponse
    }, { status: 201 })

  } catch (error: any) {
    console.error('❌ Registration error:', error)
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: 'Este email já está cadastrado' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
