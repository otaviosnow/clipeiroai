'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  BarChart3, 
  Scissors, 
  Sparkles, 
  Plus, 
  User,
  Instagram,
  Music,
  Youtube,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Bot,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  UserPlus,
  Upload,
  Zap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface AutomationStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'running' | 'completed' | 'error'
  icon: React.ReactNode
}

export default function AutomationPage() {
  const router = useRouter()
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [automationConfig, setAutomationConfig] = useState({
    parentAccount: {
      username: '',
      password: '',
      platform: 'instagram' as 'instagram' | 'tiktok' | 'youtube',
      email: ''
    },
    clipAccounts: {
      count: 10,
      platforms: ['instagram', 'tiktok', 'youtube'] as ('instagram' | 'tiktok' | 'youtube')[]
    },
    automation: {
      createEmails: true,
      createAccounts: true,
      postClips: false,
      humanSimulation: true
    }
  })

  const [steps, setSteps] = useState<AutomationStep[]>([
    {
      id: 'connect-parent',
      title: 'Conectar Conta Principal',
      description: 'Fazer login na sua conta principal do Instagram, TikTok ou YouTube',
      status: 'pending',
      icon: <User className="w-5 h-5" />
    },
    {
      id: 'analyze-profile',
      title: 'Analisar Perfil',
      description: 'AI analisa seu perfil para criar contas similares',
      status: 'pending',
      icon: <Eye className="w-5 h-5" />
    },
    {
      id: 'create-emails',
      title: 'Criar Emails',
      description: 'Gerar contas de email para cada perfil de clipe',
      status: 'pending',
      icon: <Mail className="w-5 h-5" />
    },
    {
      id: 'create-accounts',
      title: 'Criar Contas de Clipe',
      description: 'Criar perfis similares baseados na sua conta principal',
      status: 'pending',
      icon: <UserPlus className="w-5 h-5" />
    },
    {
      id: 'post-clips',
      title: 'Postar Clipes',
      description: 'Publicar clipes automaticamente nas contas criadas',
      status: 'pending',
      icon: <Upload className="w-5 h-5" />
    }
  ])

  const handleStartAutomation = async () => {
    if (!automationConfig.parentAccount.username || !automationConfig.parentAccount.password) {
      toast.error('Preencha os dados da conta principal')
      return
    }

    setIsRunning(true)
    setCurrentStep(0)

    // Simular execução das etapas
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i)
      setSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'running' } : step
      ))

      // Simular tempo de execução
      await new Promise(resolve => setTimeout(resolve, 3000))

      setSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'completed' } : step
      ))
    }

    setIsRunning(false)
    toast.success('Automação concluída com sucesso!')
  }

  const getStepIcon = (step: AutomationStep) => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'running':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return step.icon
    }
  }

  const getStepColor = (step: AutomationStep) => {
    switch (step.status) {
      case 'completed':
        return 'border-green-500 bg-green-500/10'
      case 'running':
        return 'border-blue-500 bg-blue-500/10'
      case 'error':
        return 'border-red-500 bg-red-500/10'
      default:
        return 'border-gray-600 bg-gray-800'
    }
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
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Automação Inteligente</span>
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
            <div className="text-sm text-green-400 mb-2">Automação</div>
            
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Clipeiro</span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-green-500 text-white">
                <Bot className="w-5 h-5" />
                <span>Automação</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <Scissors className="w-5 h-5" />
                <span>Meus Clipes</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <Sparkles className="w-5 h-5" />
                <span>Insights da AI</span>
              </button>
            </nav>

            {/* New Clip Button */}
            <div className="mt-8">
              <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Novo Clipe</span>
              </button>
            </div>

            {/* Profile */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <User className="w-5 h-5" />
                <span>Meu Perfil</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Automação Inteligente</h1>
            <p className="text-gray-300 mb-6">
              Configure a automação para criar contas de clipe automaticamente baseadas na sua conta principal
            </p>
          </div>

          {/* Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Parent Account */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Conta Principal
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={automationConfig.parentAccount.username}
                    onChange={(e) => setAutomationConfig(prev => ({
                      ...prev,
                      parentAccount: { ...prev.parentAccount, username: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="seu_username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={automationConfig.parentAccount.password}
                    onChange={(e) => setAutomationConfig(prev => ({
                      ...prev,
                      parentAccount: { ...prev.parentAccount, password: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Sua senha"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Plataforma
                  </label>
                  <select
                    value={automationConfig.parentAccount.platform}
                    onChange={(e) => setAutomationConfig(prev => ({
                      ...prev,
                      parentAccount: { ...prev.parentAccount, platform: e.target.value as any }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Automation Settings */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Configurações
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Número de Contas de Clipe
                  </label>
                  <input
                    type="number"
                    value={automationConfig.clipAccounts.count}
                    onChange={(e) => setAutomationConfig(prev => ({
                      ...prev,
                      clipAccounts: { ...prev.clipAccounts, count: parseInt(e.target.value) }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="1"
                    max="20"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={automationConfig.automation.createEmails}
                      onChange={(e) => setAutomationConfig(prev => ({
                        ...prev,
                        automation: { ...prev.automation, createEmails: e.target.checked }
                      }))}
                      className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-300">Criar emails automaticamente</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={automationConfig.automation.createAccounts}
                      onChange={(e) => setAutomationConfig(prev => ({
                        ...prev,
                        automation: { ...prev.automation, createAccounts: e.target.checked }
                      }))}
                      className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-300">Criar contas de clipe</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={automationConfig.automation.postClips}
                      onChange={(e) => setAutomationConfig(prev => ({
                        ...prev,
                        automation: { ...prev.automation, postClips: e.target.checked }
                      }))}
                      className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-300">Postar clipes automaticamente</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={automationConfig.automation.humanSimulation}
                      onChange={(e) => setAutomationConfig(prev => ({
                        ...prev,
                        automation: { ...prev.automation, humanSimulation: e.target.checked }
                      }))}
                      className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-300">Simulação humana (recomendado)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-6">Etapas da Automação</h3>
            
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border ${getStepColor(step)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStepIcon(step)}
                      <div>
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-gray-400">{step.description}</p>
                      </div>
                    </div>
                    {step.status === 'running' && (
                      <div className="flex items-center space-x-2 text-blue-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Executando...</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="flex justify-center">
            <button
              onClick={handleStartAutomation}
              disabled={isRunning}
              className={`px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                isRunning
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Executando...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Iniciar Automação</span>
                </>
              )}
            </button>
          </div>

          {/* Safety Notice */}
          <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-500 mb-2">Aviso de Segurança</h4>
                <p className="text-sm text-gray-300">
                  A automação usa simulação humana avançada para evitar detecção. 
                  Recomendamos usar com moderação e seguir as diretrizes das plataformas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

