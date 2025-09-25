'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Instagram, 
  Music, 
  Youtube, 
  ChevronLeft, 
  Play,
  CheckCircle,
  ArrowRight,
  Users,
  Target,
  Zap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import RealLoginModal from '@/components/RealLoginModal'

export default function ConnectAccountsPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'tiktok' | 'youtube'>('instagram')
  const [accountCredentials, setAccountCredentials] = useState<{[key: string]: {username: string, password: string}}>({})

  const handleConnectAccount = (platform: 'instagram' | 'tiktok' | 'youtube') => {
    setSelectedPlatform(platform)
    setShowLoginModal(true)
  }

  const handleLoginSuccess = (platform: string, credentials: {username: string, password: string}) => {
    setConnectedAccounts(prev => [...prev, platform])
    setAccountCredentials(prev => ({
      ...prev,
      [platform]: credentials
    }))
    toast.success(`${platform} conectado com sucesso!`)
  }

  const handleContinue = () => {
    if (connectedAccounts.length === 0) {
      toast.error('Conecte pelo menos uma conta para continuar')
      return
    }
    setCurrentStep(2)
  }

  const handleNextStep = () => {
    router.push('/dashboard-dark')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Clipeiro</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors">
              <Instagram className="w-4 h-4" />
              <span>Conectar Instagram</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors">
              <Music className="w-4 h-4" />
              <span>Conectar TikTok</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
          <div className="p-6">
            <div className="text-sm text-green-400 mb-2">Passo {currentStep} ►</div>
            
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">Clipeiro</span>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      step <= currentStep 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-600 text-gray-400'
                    }`}>
                      {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                    </div>
                    <div className={`text-sm ${
                      step <= currentStep ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step === 1 && 'Conectar Contas'}
                      {step === 2 && 'Criar Perfis'}
                      {step === 3 && 'Upload Vídeo'}
                      {step === 4 && 'Analytics'}
                      {step === 5 && 'Dashboard'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <div className="text-green-400 text-sm mb-2">Primeiro passo</div>
                <h1 className="text-4xl font-bold mb-4">Conecte suas Contas</h1>
                <p className="text-xl text-gray-300 mb-2">
                  Conecte sua conta do Instagram e TikTok
                </p>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Comece conectando suas contas do TikTok e Instagram que serão as contas principais base para a criação das outras contas
                </p>
              </div>

              {/* Connection Card */}
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                  </button>
                  <h2 className="text-2xl font-bold">Conecte suas contas</h2>
                  <div></div>
                </div>
                
                <p className="text-gray-400 mb-8">
                  A partir da conexão, iremos criar diversas outras contas
                </p>

                <div className="space-y-4 mb-8">
                  <button
                    onClick={() => handleConnectAccount('instagram')}
                    disabled={connectedAccounts.includes('instagram')}
                    className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl transition-all ${
                      connectedAccounts.includes('instagram')
                        ? 'bg-green-500 text-white'
                        : 'bg-pink-500 hover:bg-pink-600 text-white'
                    }`}
                  >
                    <Instagram className="w-6 h-6" />
                    <span className="text-lg font-medium">
                      {connectedAccounts.includes('instagram') ? 'Conectado' : 'Conectar Instagram'}
                    </span>
                    {connectedAccounts.includes('instagram') && <CheckCircle className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => handleConnectAccount('tiktok')}
                    disabled={connectedAccounts.includes('tiktok')}
                    className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl transition-all ${
                      connectedAccounts.includes('tiktok')
                        ? 'bg-green-500 text-white'
                        : 'bg-black hover:bg-gray-800 text-white'
                    }`}
                  >
                    <Music className="w-6 h-6" />
                    <span className="text-lg font-medium">
                      {connectedAccounts.includes('tiktok') ? 'Conectado' : 'Conectar TikTok'}
                    </span>
                    {connectedAccounts.includes('tiktok') && <CheckCircle className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => handleConnectAccount('youtube')}
                    disabled={connectedAccounts.includes('youtube')}
                    className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl transition-all ${
                      connectedAccounts.includes('youtube')
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-600 hover:bg-gray-500 text-white'
                    }`}
                  >
                    <Youtube className="w-6 h-6" />
                    <span className="text-lg font-medium">
                      {connectedAccounts.includes('youtube') ? 'Conectado' : 'Conectar YouTube'}
                    </span>
                    {connectedAccounts.includes('youtube') && <CheckCircle className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 py-3 px-6 bg-gray-600 hover:bg-gray-500 text-white rounded-xl transition-colors">
                    Conectar depois
                  </button>
                  <button
                    onClick={handleContinue}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Continuar</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <div className="text-green-400 text-sm mb-2">Segundo passo</div>
                <h1 className="text-4xl font-bold mb-4">Deixe a AI criar as contas</h1>
                <p className="text-xl text-gray-300 mb-2">
                  Agora a nossa AI irá criar suas contas no TikTok e Instagram
                </p>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Ela criará os nomes e fotos de capa dos perfis com base nas contas principais
                </p>
              </div>

              {/* Profile Photo Selection */}
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Escolha uma foto de perfil</h2>
                <p className="text-gray-400 mb-8">
                  A partir desta foto, nossa AI criará fotos personalizadas para cada perfil de cada conta
                </p>

                <div className="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center hover:border-green-500 transition-colors cursor-pointer">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-400">Clique para fazer upload da foto</p>
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl transition-all flex items-center justify-center space-x-2"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Real Login Modal */}
      <RealLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        platform={selectedPlatform}
        onSuccess={handleLoginSuccess}
      />
    </div>
  )
}
