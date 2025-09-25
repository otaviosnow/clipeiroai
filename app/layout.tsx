import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ClipEiro AI - Sistema de Clipes Automatizado',
  description: 'Sistema inteligente para criação automática de clipes virais',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('🎨 RootLayout rendered')
  
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
