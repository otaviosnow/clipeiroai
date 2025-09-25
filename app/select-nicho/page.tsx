'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Play, CheckCircle } from 'lucide-react'

export default function SelectNichoPage() {
  const router = useRouter()
  const [selectedNicho, setSelectedNicho] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const nichos = [
    { id: 'fitness', name: 'Fitness & Saúde', icon: '💪', description: 'Exercícios, dietas, bem-estar' },
    { id: 'tech', name: 'Tecnologia', icon: '💻', description: 'Programação, gadgets, inovação' },
    { id: 'business', name: 'Negócios', icon: '💼', description: 'Empreendedorismo, investimentos' },
    { id: 'lifestyle', name: 'Lifestyle', icon: '✨', description: 'Moda, viagens, lifestyle' },
    { id: 'education', name: 'Educação', icon: '📚', description: 'Cursos, conhecimento, aprendizado' },
    { id: 'entertainment', name: 'Entretenimento', icon: '🎭', description: 'Humor, entretenimento, memes' },
    { id: 'cooking', name: 'Culinária', icon: '🍳', description: 'Receitas, gastronomia, food' },
    { id: 'music', name: 'Música', icon: '🎵', description: 'Música, instrumentos, covers' },
    { id: 'gaming', name: 'Gaming', icon: '🎮', description: 'Jogos, streams, reviews' },
    { id: 'art', name: 'Arte & Design', icon: '🎨', description: 'Arte, design, criatividade' }
  ]

  const handleSelectNicho = (nichoId: string) => {
    setSelectedNicho(nichoId)
  }

  const handleContinue = async () => {
    if (!selectedNicho) return

    setIsLoading(true)
    
    try {
      // Salvar nicho selecionado (pode ser salvo no localStorage ou enviado para API)
      localStorage.setItem('selectedNicho', selectedNicho)
      
      // Simular processamento
      setTimeout(() => {
        setIsLoading(false)
        router.push('/onboarding')
      }, 1000)
    } catch (error) {
      console.error('Error saving nicho:', error)
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <Play className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">Clipeiro AI</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Escolha seu <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Nicho</span>
        </h1>
        <p className="text-lg text-gray-300 text-center mb-12 max-w-2xl">
          Selecione o nicho que melhor representa seu conteúdo para otimizarmos a criação dos clipes
        </p>

        {/* Nichos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mb-8">
          {nichos.map((nicho) => (
            <button
              key={nicho.id}
              onClick={() => handleSelectNicho(nicho.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                selectedNicho === nicho.id
                  ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                  : 'border-gray-700 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl">{nicho.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{nicho.name}</h3>
                  <p className="text-gray-400 text-sm">{nicho.description}</p>
                </div>
              </div>
              
              {selectedNicho === nicho.id && (
                <div className="flex items-center justify-end">
                  <CheckCircle className="w-6 h-6 text-cyan-400" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedNicho || isLoading}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <span>Continuar</span>
              <Play className="w-5 h-5 rotate-90" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
