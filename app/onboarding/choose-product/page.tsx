'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Play, Target, BarChart3, Settings, Sparkles } from 'lucide-react'

export default function ChooseProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Verificar se há dados da etapa anterior
    const onboardingData = localStorage.getItem('onboardingData')
    if (!onboardingData) {
      router.push('/onboarding')
    }
  }, [router])

  const handleChooseClipeiroAI = () => {
    setIsLoading(true)
    
    // Simular processamento
    setTimeout(() => {
      // Salvar escolha do produto
      const productChoice = { product: 'clipeiro-ai' }
      localStorage.setItem('productChoice', JSON.stringify(productChoice))
      
      // Ir para próxima etapa
      router.push('/onboarding/social-usernames')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-2xl font-bold text-white">Clipeiro AI</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="w-full max-w-4xl">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Escolha sua Experiência
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Clipeiro AI
            </h2>
            <p className="text-xl text-gray-300">
              Selecione o produto que melhor atende às suas necessidades
            </p>
          </div>

          {/* Product Card */}
          <div className="flex justify-center">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 w-full max-w-md">
              {/* Product Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">Clipeiro AI</span>
                </div>
                <p className="text-gray-300">
                  Plataforma completa de criação e automação + Studio AI incluído
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Play className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Criação Automática de Clipes</h3>
                    <p className="text-gray-400 text-sm">Transforme seus vídeos longos em múltiplos clipes virais</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Postagem Multi-Plataforma</h3>
                    <p className="text-gray-400 text-sm">Publique no Instagram, TikTok e YouTube</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Analytics Avançado</h3>
                    <p className="text-gray-400 text-sm">Monitore performance com dados precisos</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Settings className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Studio AI Integrado</h3>
                    <p className="text-gray-400 text-sm">Transforme vídeos longos em clips virais com IA</p>
                  </div>
                </div>
              </div>

              {/* Highlight */}
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Sparkles className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-medium">Solução Completa</span>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleChooseClipeiroAI}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    <span>Escolher Clipeiro AI</span>
                    <div className="w-4 h-4">→</div>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Comece sua jornada com a solução completa de automação de conteúdo
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
