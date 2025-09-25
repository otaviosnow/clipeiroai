import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { generatePasswordResetToken } from '@/lib/auth'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email } = await request.json()

    // Buscar usuário
    const user = await User.findOne({ email })
    if (!user) {
      // Por segurança, sempre retornar sucesso mesmo se o email não existir
      return NextResponse.json(
        { message: 'Se o email existir, você receberá um link de recuperação' },
        { status: 200 }
      )
    }

    // Gerar token de reset
    const resetToken = generatePasswordResetToken()
    const resetExpires = new Date(Date.now() + 3600000) // 1 hora

    // Atualizar usuário
    user.passwordResetToken = resetToken
    user.passwordResetExpires = resetExpires
    await user.save()

    // Enviar email de recuperação
    await sendPasswordResetEmail(email, resetToken)

    return NextResponse.json(
      { message: 'Se o email existir, você receberá um link de recuperação' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erro na recuperação de senha:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

async function sendPasswordResetEmail(email: string, token: string) {
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperação de senha - Clipeiro',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">Recuperação de senha</h2>
        <p>Você solicitou a recuperação de senha. Clique no link abaixo para criar uma nova senha:</p>
        <a href="${resetUrl}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Redefinir senha
        </a>
        <p>Este link expira em 1 hora.</p>
        <p>Se você não solicitou esta recuperação, ignore este email.</p>
      </div>
    `,
  })
}

