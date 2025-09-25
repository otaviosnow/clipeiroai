import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { hashPassword, generateEmailVerificationToken } from '@/lib/auth'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { name, email, password } = await request.json()

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'Este email já está em uso' },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await hashPassword(password)

    // Gerar token de verificação
    const emailVerificationToken = generateEmailVerificationToken()

    // Criar usuário
    const user = new User({
      name,
      email,
      password: hashedPassword,
      emailVerificationToken,
      socialAccounts: {
        tiktok: [],
        instagram: [],
        youtube: []
      }
    })

    await user.save()

    // Enviar email de verificação (opcional por enquanto)
    // await sendVerificationEmail(email, emailVerificationToken)

    return NextResponse.json(
      { 
        message: 'Conta criada com sucesso! Verifique seu email para ativar a conta.',
        userId: user._id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erro no registro:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verifique sua conta no Clipeiro',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">Bem-vindo ao Clipeiro!</h2>
        <p>Clique no link abaixo para verificar sua conta:</p>
        <a href="${verificationUrl}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Verificar conta
        </a>
        <p>Se você não criou uma conta, ignore este email.</p>
      </div>
    `,
  })
}

