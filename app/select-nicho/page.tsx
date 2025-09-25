'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Check, 
  Star, 
  TrendingUp, 
  Users, 
  Target,
  Lightbulb,
  Zap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { NichoTemplateManager, NichoTemplate } from '@/lib/templates/nicho-templates'

export default function SelectNichoPage() {
  const [selectedNicho, setSelectedNicho] = useState<string | null>(null)
  const [nichos, setNichos] = useState<NichoTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadNichos()
  }, [])

  const loadNichos = async () => {
    setIsLoading(true)
    try {
      const templateManager = NichoTemplateManager.getInstance()
      const nichosData = templateManager.getAllNichos()
      setNichos(nichosData)
    } catch (error) {
      toast.error('Erro ao carregar nichos')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNichoSelect = (nichoId: string) => {
    setSelectedNicho(nichoId)
  }

  const handleContinue = () => {
    if (!selectedNicho) {
      toast.error('Selecione um nicho para continuar')
      return
    }

    // Salvar nicho selecionado no localStorage
    localStorage.setItem('selectedNicho', selectedNicho)
    
    toast.success('Nicho selecionado com sucesso!')
    router.push('/upload-video')
  }

  const getNichoIcon = (icone: string) => {
    return <span className="text-4xl">{icone}</span>
  }

  const getNichoColor = (cor: string) => {
    return { backgroundColor: cor }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              Selecione seu Nicho
            </h1>
            <p className="text-gray-300 text-lg">
              Escolha o nicho que melhor representa seu conteúdo para personalizar os clipes
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Nichos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {nichos.map((nicho) => (
            <motion.div
              key={nicho.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer rounded-xl border-2 transition-all duration-300 ${
                selectedNicho === nicho.id
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              }`}
              onClick={() => handleNichoSelect(nicho.id)}
            >
              {/* Selection Indicator */}
              {selectedNicho === nicho.id && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}

              <div className="p-6">
                {/* Nicho Icon */}
                <div className="flex items-center justify-center mb-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={getNichoColor(nicho.cor)}
                  >
                    {getNichoIcon(nicho.icone)}
                  </div>
                </div>

                {/* Nicho Info */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{nicho.nome}</h3>
                  <p className="text-gray-400 text-sm mb-4">{nicho.descricao}</p>
                  
                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {nicho.hashtags.map((hashtag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-xs rounded-full text-gray-300"
                      >
                        {hashtag}
                      </span>
                    ))}
                  </div>

                  {/* Configurações */}
                  <div className="text-xs text-gray-500">
                    <div className="flex items-center justify-center space-x-4">
                      <span>Duração: {nicho.configuracoes.duracao}s</span>
                      <span>•</span>
                      <span>Qualidade: {nicho.configuracoes.qualidade}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Nicho Details */}
        {selectedNicho && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Nicho Selecionado</h3>
                <p className="text-gray-400">
                  {nichos.find(n => n.id === selectedNicho)?.nome}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">Estilos Disponíveis</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {nichos.find(n => n.id === selectedNicho)?.estilos.map((estilo, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-600 text-xs rounded-full">
                      {estilo}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="font-medium">Hashtags Recomendadas</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {nichos.find(n => n.id === selectedNicho)?.hashtags.map((hashtag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">Efeitos Inclusos</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {nichos.find(n => n.id === selectedNicho)?.configuracoes.efeitos.map((efeito, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                      {efeito}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Continue Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            disabled={!selectedNicho}
            className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              selectedNicho
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Continuar</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm">
              Você pode alterar o nicho a qualquer momento nas configurações
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

