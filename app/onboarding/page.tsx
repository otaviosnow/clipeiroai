'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lightbulb, Instagram, Music, Youtube } from 'lucide-react'

export default function OnboardingPage() {
  const router = useRouter()
  const [objective, setObjective] = useState('')
  const [email, setEmail] = useState('')
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [youtube, setYoutube] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Gerar ID único para o usuário
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      // Preparar dados para envio
      const socialProfiles = [
        { platform: 'instagram', username: instagram.trim() },
        { platform: 'tiktok', username: tiktok.trim() },
        { platform: 'youtube', username: youtube.trim() }
      ].filter(profile => profile.username)

      // Salvar dados no banco
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          userEmail: email,
          objective,
          socialProfiles,
          productChoice: 'clipeiro-ai'
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar dados')
      }

      const result = await response.json()
      console.log('✅ Onboarding data saved:', result)

      // Salvar userId no localStorage para próximas etapas
      localStorage.setItem('onboardingUserId', userId)
      
      // Ir para próxima etapa
      router.push('/onboarding/choose-product')
      
    } catch (error) {
      console.error('❌ Error saving onboarding data:', error)
      alert('Erro ao salvar dados. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
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
        <div className="w-full max-w-2xl">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Vamos personalizar
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Sua Experiência
            </h2>
            <p className="text-xl text-gray-300">
              Conte-nos mais sobre seus objetivos para otimizarmos sua experiência
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Email Section */}
              <div>
                <label className="block text-white text-lg font-semibold mb-3">
                  Seu email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-4 bg-gray-800 rounded-lg border border-gray-600 focus:ring-2 focus:ring-cyan-400 focus:border-transparent outline-none text-white placeholder-gray-400"
                  placeholder="seu@email.com"
                />
              </div>

              {/* Objective Section */}
              <div>
                <label className="block text-white text-lg font-semibold mb-3">
                  Qual é seu principal objetivo? <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="Ex: Aumentar minha audiência no Instagram para promover meu negócio de consultoria, Viralizar conteúdo educativo sobre programação, Monetizar meu canal no YouTube com mais views, Construir autoridade no meu nicho de fitness..."
                  className="w-full h-32 bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none"
                  required
                />
                <div className="flex items-center space-x-2 mt-2">
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">
                    Seja específico! Isso nos ajuda a personalizar as funcionalidades para você.
                  </span>
                </div>
              </div>

              {/* Social Profiles Section */}
              <div>
                <label className="block text-white text-lg font-semibold mb-3">
                  Seus perfis de redes sociais <span className="text-red-500">*</span>
                </label>
                <p className="text-gray-300 mb-4">Adicione pelo menos um username (sem o @)</p>
                
                <div className="space-y-4">
                  {/* Instagram */}
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <Instagram className="w-5 h-5 text-pink-500" />
                      <span className="text-white font-medium">Instagram</span>
                    </div>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      placeholder="seu_usuario_instagram"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  {/* TikTok */}
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <Music className="w-5 h-5 text-black bg-white rounded" />
                      <span className="text-white font-medium">TikTok</span>
                    </div>
                    <input
                      type="text"
                      value={tiktok}
                      onChange={(e) => setTiktok(e.target.value)}
                      placeholder="seu_usuario_tiktok"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  {/* YouTube */}
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <Youtube className="w-5 h-5 text-red-500" />
                      <span className="text-white font-medium">YouTube</span>
                    </div>
                    <input
                      type="text"
                      value={youtube}
                      onChange={(e) => setYoutube(e.target.value)}
                      placeholder="seu_canal_youtube"
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || (!objective.trim() || (!instagram.trim() && !tiktok.trim() && !youtube.trim()))}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Finalizando configuração...</span>
                  </>
                ) : (
                  <>
                    <span>Finalizar Configuração</span>
                    <div className="w-4 h-4">🚀</div>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
