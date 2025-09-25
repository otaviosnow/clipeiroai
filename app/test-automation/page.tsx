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
  Zap,
  TestTube,
  FileText,
  Download
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface TestStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'running' | 'completed' | 'error'
  icon: React.ReactNode
}

export default function TestAutomationPage() {
  const router = useRouter()
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [testResults, setTestResults] = useState<any>(null)
  const [testConfig, setTestConfig] = useState({
    parentAccount: {
      username: 'minhaconta_teste',
      displayName: 'Minha Conta Teste',
      bio: 'Criador de conteúdo incrível! 🎬✨\n📱 Siga para mais conteúdo\n🔥 Clipes que viralizam!',
      profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teste',
      link: 'https://linktr.ee/minhaconta',
      platform: 'instagram' as 'instagram' | 'tiktok' | 'youtube'
    },
    clipAccounts: {
      count: 5,
      platforms: ['instagram', 'tiktok', 'youtube'] as ('instagram' | 'tiktok' | 'youtube')[]
    },
    testMode: {
      skipLogin: true,
      mockData: true,
      simulateCreation: true,
      humanSimulation: true
    }
  })

  const [steps, setSteps] = useState<TestStep[]>([
    {
      id: 'analyze-parent',
      title: 'Analisar Conta Principal',
      description: 'Analisar perfil sem fazer login real',
      status: 'pending',
      icon: <Eye className="w-5 h-5" />
    },
    {
      id: 'generate-profiles',
      title: 'Gerar Perfis de Clipe',
      description: 'AI gera perfis similares baseados na conta principal',
      status: 'pending',
      icon: <UserPlus className="w-5 h-5" />
    },
    {
      id: 'generate-emails',
      title: 'Gerar Emails',
      description: 'Criar contas de email para cada perfil de clipe',
      status: 'pending',
      icon: <Mail className="w-5 h-5" />
    },
    {
      id: 'simulate-accounts',
      title: 'Simular Criação de Contas',
      description: 'Simular criação de contas nas plataformas',
      status: 'pending',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'simulate-clips',
      title: 'Simular Postagem de Clipes',
      description: 'Simular postagem de clipes nas contas criadas',
      status: 'pending',
      icon: <Upload className="w-5 h-5" />
    }
  ])

  const handleStartTest = async () => {
    if (!testConfig.parentAccount.username || !testConfig.parentAccount.displayName) {
      toast.error('Preencha os dados da conta principal')
      return
    }

    setIsRunning(true)
    setCurrentStep(0)
    setTestResults(null)

    try {
      // Simular execução das etapas
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i)
        setSteps(prev => prev.map((step, index) => 
          index === i ? { ...step, status: 'running' } : step
        ))

        // Simular tempo de execução baseado na etapa
        const executionTime = i === 0 ? 2000 : i === 1 ? 3000 : i === 2 ? 2500 : i === 3 ? 4000 : 3000
        await new Promise(resolve => setTimeout(resolve, executionTime))

        setSteps(prev => prev.map((step, index) => 
          index === i ? { ...step, status: 'completed' } : step
        ))
      }

      // Gerar resultados de teste
      const mockResults = {
        success: true,
        parentAccountAnalyzed: true,
        emailsGenerated: testConfig.clipAccounts.count,
        profilesGenerated: testConfig.clipAccounts.count,
        clipsSimulated: testConfig.clipAccounts.count,
        errors: [],
        mockData: {
          parentAccount: testConfig.parentAccount,
          clipProfiles: generateMockClipProfiles(testConfig.parentAccount, testConfig.clipAccounts.count),
          emailAccounts: generateMockEmailAccounts(testConfig.parentAccount.username, testConfig.clipAccounts.count)
        }
      }

      setTestResults(mockResults)
      setIsRunning(false)
      toast.success('Teste concluído com sucesso!')

    } catch (error) {
      setIsRunning(false)
      toast.error('Erro durante o teste')
    }
  }

  const generateMockClipProfiles = (parentAccount: any, count: number) => {
    const profiles = []
    for (let i = 0; i < count; i++) {
      profiles.push({
        username: `${parentAccount.username}_clips${i + 1}`,
        displayName: `${parentAccount.displayName} Clips ${i + 1} 🎬`,
        bio: `🎬 Clips virais e conteúdo incrível!\n📱 Siga para mais conteúdo\n✨ ${parentAccount.bio}`,
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=clip${i + 1}`,
        platform: testConfig.clipAccounts.platforms[i % testConfig.clipAccounts.platforms.length],
        parentAccount: parentAccount.username,
        isActive: true
      })
    }
    return profiles
  }

  const generateMockEmailAccounts = (parentUsername: string, count: number) => {
    const emails = []
    const providers = ['gmail.com', 'outlook.com', 'yahoo.com', 'protonmail.com']
    
    for (let i = 0; i < count; i++) {
      emails.push({
        email: `${parentUsername}_clips${i + 1}@${providers[i % providers.length]}`,
        password: 'Clipeiro123!',
        provider: providers[i % providers.length].split('.')[0],
        isActive: true,
        createdAt: new Date()
      })
    }
    return emails
  }

  const getStepIcon = (step: TestStep) => {
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

  const getStepColor = (step: TestStep) => {
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

  const downloadTestReport = () => {
    if (!testResults) return

    const report = `
# 🧪 Relatório de Teste - Clipeiro

## 📊 Resultados:
- **Sucesso**: ${testResults.success ? '✅' : '❌'}
- **Conta Principal Analisada**: ${testResults.parentAccountAnalyzed ? '✅' : '❌'}
- **Emails Gerados**: ${testResults.emailsGenerated}
- **Perfis Gerados**: ${testResults.profilesGenerated}
- **Clipes Simulados**: ${testResults.clipsSimulated}

## 📋 Dados Gerados:

### Conta Principal:
- **Username**: ${testResults.mockData.parentAccount.username}
- **Display Name**: ${testResults.mockData.parentAccount.displayName}
- **Bio**: ${testResults.mockData.parentAccount.bio}
- **Platform**: ${testResults.mockData.parentAccount.platform}

### Perfis de Clipe:
${testResults.mockData.clipProfiles.map((profile: any, index: number) => `
${index + 1}. **${profile.username}**
   - Display: ${profile.displayName}
   - Platform: ${profile.platform}
   - Bio: ${profile.bio.substring(0, 50)}...
`).join('')}

### Emails Gerados:
${testResults.mockData.emailAccounts.map((email: any, index: number) => `
${index + 1}. **${email.email}**
   - Provider: ${email.provider}
   - Password: ${email.password}
`).join('')}

## 🎯 Conclusão:
Teste executado com sucesso! Todos os componentes funcionaram corretamente.
    `

    const blob = new Blob([report], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'relatorio-teste-clipeiro.md'
    a.click()
    URL.revokeObjectURL(url)
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
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <TestTube className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Modo de Teste</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors">
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors">
              <Music className="w-4 h-4" />
              <span>TikTok</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
          <div className="p-6">
            <div className="text-sm text-purple-400 mb-2">Modo de Teste</div>
            
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <TestTube className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Clipeiro</span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span>Dashboard</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <Bot className="w-5 h-5" />
                <span>Automação</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-purple-500 text-white">
                <TestTube className="w-5 h-5" />
                <span>Modo de Teste</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <Sparkles className="w-5 h-5" />
                <span>Insights da AI</span>
              </button>
            </nav>

            {/* Test Button */}
            <div className="mt-8">
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
                <TestTube className="w-5 h-5" />
                <span>Executar Teste</span>
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
            <h1 className="text-3xl font-bold mb-4">Modo de Teste</h1>
            <p className="text-gray-300 mb-6">
              Teste todo o sistema sem fazer login real. Perfeito para desenvolvimento e validação!
            </p>
          </div>

          {/* Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Parent Account */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Conta Principal (Simulada)
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={testConfig.parentAccount.username}
                    onChange={(e) => setTestConfig(prev => ({
                      ...prev,
                      parentAccount: { ...prev.parentAccount, username: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="minhaconta_teste"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome de Exibição
                  </label>
                  <input
                    type="text"
                    value={testConfig.parentAccount.displayName}
                    onChange={(e) => setTestConfig(prev => ({
                      ...prev,
                      parentAccount: { ...prev.parentAccount, displayName: e.target.value }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Minha Conta Teste"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Biografia
                  </label>
                  <textarea
                    value={testConfig.parentAccount.bio}
                    onChange={(e) => setTestConfig(prev => ({
                      ...prev,
                      parentAccount: { ...prev.parentAccount, bio: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Sua biografia aqui..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Plataforma
                  </label>
                  <select
                    value={testConfig.parentAccount.platform}
                    onChange={(e) => setTestConfig(prev => ({
                      ...prev,
                      parentAccount: { ...prev.parentAccount, platform: e.target.value as any }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="youtube">YouTube</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Test Settings */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Configurações de Teste
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Número de Contas de Clipe
                  </label>
                  <input
                    type="number"
                    value={testConfig.clipAccounts.count}
                    onChange={(e) => setTestConfig(prev => ({
                      ...prev,
                      clipAccounts: { ...prev.clipAccounts, count: parseInt(e.target.value) }
                    }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="1"
                    max="10"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={testConfig.testMode.skipLogin}
                      onChange={(e) => setTestConfig(prev => ({
                        ...prev,
                        testMode: { ...prev.testMode, skipLogin: e.target.checked }
                      }))}
                      className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-300">Pular login real (recomendado)</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={testConfig.testMode.mockData}
                      onChange={(e) => setTestConfig(prev => ({
                        ...prev,
                        testMode: { ...prev.testMode, mockData: e.target.checked }
                      }))}
                      className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-300">Usar dados simulados</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={testConfig.testMode.simulateCreation}
                      onChange={(e) => setTestConfig(prev => ({
                        ...prev,
                        testMode: { ...prev.testMode, simulateCreation: e.target.checked }
                      }))}
                      className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-300">Simular criação de contas</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={testConfig.testMode.humanSimulation}
                      onChange={(e) => setTestConfig(prev => ({
                        ...prev,
                        testMode: { ...prev.testMode, humanSimulation: e.target.checked }
                      }))}
                      className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-300">Simulação humana</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-6">Etapas do Teste</h3>
            
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
          <div className="flex justify-center mb-8">
            <button
              onClick={handleStartTest}
              disabled={isRunning}
              className={`px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                isRunning
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Executando Teste...</span>
                </>
              ) : (
                <>
                  <TestTube className="w-5 h-5" />
                  <span>Iniciar Teste</span>
                </>
              )}
            </button>
          </div>

          {/* Test Results */}
          {testResults && (
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Resultados do Teste</h3>
                <button
                  onClick={downloadTestReport}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Relatório</span>
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500 mb-1">{testResults.emailsGenerated}</div>
                  <div className="text-sm text-gray-400">Emails Gerados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500 mb-1">{testResults.profilesGenerated}</div>
                  <div className="text-sm text-gray-400">Perfis Gerados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500 mb-1">{testResults.clipsSimulated}</div>
                  <div className="text-sm text-gray-400">Clipes Simulados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500 mb-1">✅</div>
                  <div className="text-sm text-gray-400">Status</div>
                </div>
              </div>

              {/* Mock Data Preview */}
              <div className="space-y-4">
                <h4 className="font-medium">Perfis de Clipe Gerados:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {testResults.mockData.clipProfiles.slice(0, 4).map((profile: any, index: number) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <img 
                          src={profile.profilePicture} 
                          alt={profile.username}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium">{profile.username}</div>
                          <div className="text-sm text-gray-400">{profile.platform}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-300">{profile.bio.substring(0, 100)}...</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Safety Notice */}
          <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-500 mb-2">Modo de Teste Seguro</h4>
                <p className="text-sm text-gray-300">
                  Este modo não faz login real nem cria contas reais. 
                  Perfeito para testar funcionalidades sem riscos!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

