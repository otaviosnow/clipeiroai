'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Instagram, Music, Youtube, Check } from 'lucide-react'

export default function SocialUsernamesPage() {
  const router = useRouter()
  const [instagram, setInstagram] = useState('')
  const [tiktok, setTiktok] = useState('')
  const [youtube, setYoutube] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Verificar se há userId das etapas anteriores
    const userId = localStorage.getItem('onboardingUserId')
    
    if (!userId) {
      router.push('/onboarding')
    } else {
      // Buscar dados do banco para preencher os campos
      fetchOnboardingData(userId)
    }
  }, [router])

  const fetchOnboardingData = async (userId: string) => {
    try {
      const response = await fetch(`/api/onboarding?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Preencher campos com dados do banco
          data.data.socialProfiles.forEach((profile: any) => {
            if (profile.platform === 'instagram') setInstagram(profile.username)
            if (profile.platform === 'tiktok') setTiktok(profile.username)
            if (profile.platform === 'youtube') setYoutube(profile.username)
          })
        }
      }
    } catch (error) {
      console.error('❌ Error fetching onboarding data:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const userId = localStorage.getItem('onboardingUserId')
      if (!userId) {
        router.push('/onboarding')
        return
      }

      // Atualizar dados no banco com os usernames finais
      const response = await fetch('/api/onboarding/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          socialUsernames: {
            instagram: instagram.trim(),
            tiktok: tiktok.trim(),
            youtube: youtube.trim()
          }
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao atualizar dados')
      }

      setIsLoading(false)
      setIsProcessing(true)
      
      // Simular criação de contas de clipes
      setTimeout(() => {
        // Limpar dados temporários
        localStorage.removeItem('onboardingUserId')
        
        // Salvar dados finais para o dashboard
        localStorage.setItem('userOnboardingCompleted', 'true')
        localStorage.setItem('userId', userId)
        
        // Ir para dashboard
        router.push('/dashboard-dark')
      }, 3000)
      
    } catch (error) {
      console.error('❌ Error updating onboarding data:', error)
      alert('Erro ao finalizar configuração. Tente novamente.')
      setIsLoading(false)
    }
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900 flex items-center justify-center">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Finalizando configuração...</h2>
            <p className="text-gray-300">
              Aguarde enquanto preparamos tudo para você
            </p>
          </div>
        </div>
      </div>
    )
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
              Configure suas contas
            </h1>
            <p className="text-xl text-gray-300">
              Preencha os usernames das suas redes sociais para criarmos contas de clipes similares
            </p>
          </div>

          {/* Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Social Profiles */}
              <div className="space-y-6">
                {/* Instagram */}
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <Instagram className="w-6 h-6 text-pink-500" />
                    <span className="text-white font-semibold text-lg">Instagram</span>
                  </div>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="seu_usuario_instagram"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-lg"
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    Criaremos: @{instagram}_clips
                  </p>
                </div>

                {/* TikTok */}
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <Music className="w-6 h-6 text-black bg-white rounded" />
                    <span className="text-white font-semibold text-lg">TikTok</span>
                  </div>
                  <input
                    type="text"
                    value={tiktok}
                    onChange={(e) => setTiktok(e.target.value)}
                    placeholder="seu_usuario_tiktok"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-lg"
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    Criaremos: @{tiktok}_clips
                  </p>
                </div>

                {/* YouTube */}
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <Youtube className="w-6 h-6 text-red-500" />
                    <span className="text-white font-semibold text-lg">YouTube</span>
                  </div>
                  <input
                    type="text"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    placeholder="seu_canal_youtube"
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-lg"
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    Criaremos: {youtube}_clips
                  </p>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-cyan-400 font-semibold mb-2">Como funciona:</h3>
                    <p className="text-gray-300 text-sm">
                      Criaremos contas de clipes baseadas no seu perfil original. 
                      Elas terão nomes similares, biografias adaptadas e seguirão o mesmo estilo visual.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || (!instagram.trim() && !tiktok.trim() && !youtube.trim())}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Configurando...</span>
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
