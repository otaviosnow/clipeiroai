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
  Video,
  RefreshCw
} from 'lucide-react'
import { useAccountData } from '@/lib/hooks/useAccountData'

export default function DashboardDark() {
  const router = useRouter()
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    isTest: boolean;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Hook para dados das contas
  const { accountData, connectedAccounts, isLoading: dataLoading, refreshData } = useAccountData()

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Clipeiro AI</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Assinar Studio AI</span>
              </button>
              <button className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
                <Crown className="w-4 h-4" />
                <span>Assinar Clipeiro PRO</span>
              </button>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">Vg</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-900/50 backdrop-blur-sm min-h-screen p-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">Clipeiro AI</span>
          </div>

          <nav className="space-y-2">
            {/* Home - Active */}
            <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-800 border-l-4 border-cyan-400 flex items-center space-x-3">
              <div className="w-5 h-5">🏠</div>
              <span className="font-medium">Home</span>
            </button>
            
            <button
              onClick={() => router.push('/analytics-portugues')}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-3"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Analytics</span>
            </button>
            
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-3">
              <Settings className="w-5 h-5" />
              <span>Studio AI</span>
              <span className="ml-auto bg-green-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
            </button>
            
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-3">
              <div className="w-5 h-5">✂️</div>
              <span>Meus cortes</span>
            </button>
            
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-3">
              <div className="w-5 h-5">⭐</div>
              <span>Insights da AI</span>
            </button>
          </nav>

          {/* New Clip Button */}
          <div className="mt-8">
            <button
              onClick={handleNewClip}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-3 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
            >
              <div className="w-5 h-5">+</div>
              <span>Novo corte</span>
            </button>
          </div>

          {/* Profile Button */}
          <div className="mt-8">
            <button className="w-full border border-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
              <div className="w-5 h-5">👤</div>
              <span>Meu perfil</span>
            </button>
          </div>

          {/* Footer */}
          <div className="absolute bottom-6 left-6">
            <p className="text-gray-400 text-xs">Clipeiro® 2025</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            {/* Central Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-12 text-center">
              <div className="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <div className="w-12 h-12 border-2 border-cyan-400 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 text-cyan-400 text-2xl">+</div>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">
                Comece criando seu primeiro corte
              </h2>
              
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Faça upload de um vídeo e deixe nossa IA criar múltiplos clipes virais automaticamente
              </p>
              
              <button
                onClick={handleNewClip}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold py-3 px-8 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300"
              >
                Criar Primeiro Corte
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
