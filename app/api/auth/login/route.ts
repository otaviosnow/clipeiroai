import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'clipeiro-super-secret-jwt-key-2024'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { email, password } = body

    console.log('🔐 Login attempt:', { email })

    // Validações básicas
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar usuário (incluindo senha para comparação)
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Verificar se usuário está ativo
    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: 'Conta desativada' },
        { status: 401 }
      )
    }

    // Verificar senha
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      )
    }

    // Gerar JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    console.log('✅ Login successful:', user.email)

    // Retornar dados do usuário (sem senha) e token
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      createdAt: user.createdAt
    }

    return NextResponse.json({
      success: true,
      message: 'Login realizado com sucesso',
      user: userResponse,
      token
    })

  } catch (error: any) {
    console.error('❌ Login error:', error)
    
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
