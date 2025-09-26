'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Play, ArrowLeft } from 'lucide-react'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  console.log('🔐 Login page rendered')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Enviar dados para API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.message || 'Erro ao fazer login')
        return
      }

      console.log('✅ Login successful:', result.user)
      
      // Salvar token e dados do usuário
      localStorage.setItem('authToken', result.token)
      localStorage.setItem('user', JSON.stringify(result.user))
      
      // Verificar se é primeiro login (sem onboarding)
      const hasOnboarding = localStorage.getItem(`onboarding_${result.user.id}`)
      if (!hasOnboarding) {
        router.push('/onboarding')
      } else {
        router.push('/dashboard-dark')
      }
      
    } catch (error) {
      console.error('❌ Login failed:', error)
      setError('Erro ao conectar com o servidor')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ClipEiro AI</span>
            </div>
            
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-800 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Fazer Login</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Sua senha"
              />
            </div>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Não tem conta?{' '}
              <button
                onClick={() => router.push('/register')}
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Criar conta
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
