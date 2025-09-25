'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Play, 
  BarChart3, 
  Zap, 
  Shield, 
  Globe, 
  Crown, 
  DollarSign,
  Settings,
  LogOut,
  Target,
  TrendingUp,
  Users,
  Video
} from 'lucide-react'

export default function DashboardDark() {
  const router = useRouter()
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    isTest: boolean;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  console.log('📊 Dashboard rendered')

  useEffect(() => {
    console.log('🔍 Checking authentication...')
    
    // Check for test user in localStorage
    const testUser = localStorage.getItem('testUser')
    if (testUser) {
      console.log('✅ Test user found:', JSON.parse(testUser))
      setUser(JSON.parse(testUser))
      setIsLoading(false)
      return
    }

    // Check for real user (simulated)
    const realUser = {
      id: 'user-123',
      name: 'Usuário Real',
      email: 'usuario@clipeiro.com',
      isTest: false
    }
    
    console.log('✅ Real user set:', realUser)
    setUser(realUser)
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    console.log('🚪 Logout initiated')
    localStorage.removeItem('testUser')
    router.push('/')
  }

  const handleNewClip = () => {
    console.log('🎬 New clip button clicked')
    router.push('/upload-video')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
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
              <span className="text-sm text-gray-400">
                Olá, {user?.name || 'Usuário'}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900/50 min-h-screen p-6">
          <nav className="space-y-4">
            <button
              onClick={handleNewClip}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Novo Clipe</span>
            </button>
            
            <div className="space-y-2">
              <button
                onClick={() => router.push('/analytics-portugues')}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </button>
              
              <button
                onClick={() => router.push('/viral-analysis')}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <TrendingUp className="w-5 h-5" />
                <span>Análise Viral EUA</span>
              </button>
              
              <button
                onClick={() => router.push('/automation')}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Automação</span>
              </button>
              
              <button
                onClick={() => router.push('/plans')}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <Crown className="w-5 h-5" />
                <span>Planos</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Clipes Criados</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Video className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Visualizações</p>
                    <p className="text-2xl font-bold">12.5K</p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Engajamento</p>
                    <p className="text-2xl font-bold">8.2%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Seguidores</p>
                    <p className="text-2xl font-bold">1.2K</p>
                  </div>
                  <Users className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">Ações Rápidas</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push('/upload-video')}
                    className="w-full text-left px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Upload de Vídeo
                  </button>
                  <button
                    onClick={() => router.push('/select-nicho')}
                    className="w-full text-left px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Selecionar Nicho
                  </button>
                  <button
                    onClick={() => router.push('/test-automation')}
                    className="w-full text-left px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Testar Automação
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">Status do Sistema</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>MongoDB</span>
                    <span className="text-green-500">Conectado</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Análise Viral</span>
                    <span className="text-green-500">Ativo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Automação</span>
                    <span className="text-yellow-500">Pausado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
