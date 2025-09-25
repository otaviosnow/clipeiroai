'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Play, Zap, Shield, Globe, Crown, DollarSign } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [showTestLogin, setShowTestLogin] = useState(false)

  console.log('🏠 Home page rendered')

  const handleTestLogin = () => {
    console.log('🔐 Test login initiated')
    // Simulate test user data
    const testUser = {
      id: 'test-user-123',
      name: 'Usuário Teste',
      email: 'teste@clipeiro.com',
      isTest: true
    }
    
    // Save to localStorage
    localStorage.setItem('testUser', JSON.stringify(testUser))
    console.log('✅ Test user saved to localStorage')
    
    // Redirect to dashboard
    router.push('/dashboard-dark')
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
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowTestLogin(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                Login Teste
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            ClipEiro AI
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Sistema inteligente para criação automática de clipes virais. 
            Análise de tendências, automação completa e resultados garantidos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowTestLogin(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Começar Agora
            </button>
            <button
              onClick={() => router.push('/login')}
              className="border border-gray-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-300"
            >
              Fazer Login
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <Zap className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Análise Viral EUA</h3>
              <p className="text-gray-400">Rastreamento de tendências em tempo real nos EUA</p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <Shield className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Automação Completa</h3>
              <p className="text-gray-400">Criação e publicação automática de clipes</p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <Globe className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multi-plataforma</h3>
              <p className="text-gray-400">Instagram, TikTok e YouTube integrados</p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <Crown className="w-8 h-8 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">IA Avançada</h3>
              <p className="text-gray-400">Aprendizado contínuo e otimização</p>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <DollarSign className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Monetização</h3>
              <p className="text-gray-400">Planos premium com funcionalidades exclusivas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Test Login Modal */}
      {showTestLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Login Teste</h3>
            <p className="text-gray-400 mb-6">
              Para testar o sistema, use qualquer login e senha.
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={handleTestLogin}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex-1"
              >
                Entrar
              </button>
              <button
                onClick={() => setShowTestLogin(false)}
                className="border border-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
