'use client'

import { useState, useEffect } from 'react'
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
  Target,
  Shield,
  Globe,
  Crown,
  DollarSign
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { DEV_MODE, MOCK_USER } from '@/lib/dev-mode'
import VideoFormatModal from '@/components/VideoFormatModal'

interface DashboardStats {
  clipsGenerated: number
  videosProcessed: number
  postsScheduled: number
  accountsConnected: number
  totalViews: number
  totalLikes: number
  totalComments: number
}

interface Account {
  id: string
  name: string
  platform: 'instagram' | 'tiktok' | 'youtube'
  username: string
  isMain: boolean
  isConnected: boolean
  stats: {
    views: number
    likes: number
    comments: number
    followers: number
  }
}

export default function DashboardDarkPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('home')
  const [stats, setStats] = useState<DashboardStats>({
    clipsGenerated: 0,
    videosProcessed: 0,
    postsScheduled: 0,
    accountsConnected: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0
  })
  const [accounts, setAccounts] = useState<Account[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [showVideoFormatModal, setShowVideoFormatModal] = useState(false)

  useEffect(() => {
    // Verificar se é login de teste
    const testUser = localStorage.getItem('testUser')
    if (testUser) {
      const userData = JSON.parse(testUser)
      setUser({
        id: 'test-user',
        name: userData.username,
        email: `${userData.username}@test.com`,
        avatar: null,
        isEmailVerified: true
      })
      setIsLoading(false)
      return
    }
    
    fetchUser()
    fetchStats()
    fetchAccounts()
  }, [])

  const fetchUser = async () => {
    try {
      if (DEV_MODE) {
        setUser(MOCK_USER)
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        router.push('/login')
      }
    } catch (error) {
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    // Simular dados reais baseados no que foi processado
    const mockStats: DashboardStats = {
      clipsGenerated: 240,
      videosProcessed: 24,
      postsScheduled: 12,
      accountsConnected: 8,
      totalViews: 432000,
      totalLikes: 300000,
      totalComments: 20000
    }
    setStats(mockStats)
  }

  const fetchAccounts = async () => {
    // Simular contas conectadas
    const mockAccounts: Account[] = [
      {
        id: 'main-instagram',
        name: 'Conta Principal',
        platform: 'instagram',
        username: '@minhaconta',
        isMain: true,
        isConnected: true,
        stats: { views: 150000, likes: 120000, comments: 5000, followers: 50000 }
      },
      {
        id: 'main-tiktok',
        name: 'TikTok Principal',
        platform: 'tiktok',
        username: '@meutiktok',
        isMain: true,
        isConnected: true,
        stats: { views: 200000, likes: 150000, comments: 8000, followers: 30000 }
      },
      {
        id: 'clone-1',
        name: 'Conta Clone 1',
        platform: 'instagram',
        username: '@minhaconta_clone1',
        isMain: false,
        isConnected: true,
        stats: { views: 50000, likes: 30000, comments: 1000, followers: 5000 }
      },
      {
        id: 'clone-2',
        name: 'Conta Clone 2',
        platform: 'tiktok',
        username: '@meutiktok_clone2',
        isMain: false,
        isConnected: true,
        stats: { views: 32000, likes: 20000, comments: 500, followers: 2000 }
      }
    ]
    setAccounts(mockAccounts)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />
      case 'tiktok':
        return <Music className="w-4 h-4" />
      case 'youtube':
        return <Youtube className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'text-pink-500'
      case 'tiktok':
        return 'text-black'
      case 'youtube':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700 z-50">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Clipeiro</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => router.push('/analytics-portugues')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <TrendingUp className="w-5 h-5" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => router.push('/upload-video')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Scissors className="w-5 h-5" />
              <span>Meus Clipes</span>
            </button>

            <button
              onClick={() => router.push('/select-nicho')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Target className="w-5 h-5" />
              <span>Selecionar Nicho</span>
            </button>

            <button
              onClick={() => router.push('/automation')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Sparkles className="w-5 h-5" />
              <span>Automação</span>
            </button>

            <button
              onClick={() => router.push('/test-automation')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Play className="w-5 h-5" />
              <span>Teste Automação</span>
            </button>

            <button
              onClick={() => router.push('/admin/accounts-backup')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Shield className="w-5 h-5" />
              <span>Backup Contas</span>
            </button>

            <button
              onClick={() => router.push('/viral-analysis')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Globe className="w-5 h-5" />
              <span>Análise Viral EUA</span>
            </button>

            <button
              onClick={() => router.push('/free-usa-analysis')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <DollarSign className="w-5 h-5" />
              <span>TikTok/Instagram EUA</span>
            </button>

            <button
              onClick={() => router.push('/plans')}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <Crown className="w-5 h-5" />
              <span>Planos</span>
            </button>
          </nav>

          {/* New Clip Button */}
          <div className="mt-8">
            <button 
              onClick={() => setShowVideoFormatModal(true)}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Novo Clipe</span>
            </button>
          </div>

          {/* Profile */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300">
              <User className="w-5 h-5" />
              <span>Meu Perfil</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-400">Acompanhe o desempenho dos seus clipes</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <Instagram className="w-4 h-4" />
                <span>Conectar Instagram</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <Music className="w-4 h-4" />
                <span>Conectar TikTok</span>
              </button>
              
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                Upgrade
              </button>
              
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">MR</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Clipes Gerados</p>
                  <p className="text-2xl font-bold text-white">{stats.clipsGenerated}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Scissors className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Vídeos Processados</p>
                  <p className="text-2xl font-bold text-white">{stats.videosProcessed}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Posts Agendados</p>
                  <p className="text-2xl font-bold text-white">{stats.postsScheduled}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Contas Conectadas</p>
                  <p className="text-2xl font-bold text-white">{stats.accountsConnected}</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Performance Geral</h3>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="bg-gray-700 text-white px-3 py-1 rounded-lg border border-gray-600"
                  >
                    <option value="7d">Últimos 7 dias</option>
                    <option value="30d">Últimos 30 dias</option>
                    <option value="90d">Últimos 90 dias</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">{formatNumber(stats.totalViews)}</div>
                  <div className="text-gray-400 text-sm">Visualizações</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">{formatNumber(stats.totalLikes)}</div>
                  <div className="text-gray-400 text-sm">Curtidas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-500">{formatNumber(stats.totalComments)}</div>
                  <div className="text-gray-400 text-sm">Comentários</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-4">Contas Principais</h3>
              <div className="space-y-3">
                {accounts.filter(acc => acc.isMain).map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getPlatformColor(account.platform)}`}>
                        {getPlatformIcon(account.platform)}
                      </div>
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-gray-400">{account.username}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatNumber(account.stats.views)}</p>
                      <p className="text-xs text-gray-400">views</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Accounts Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-800 rounded-xl border border-gray-700"
          >
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Todas as Contas</h3>
                <div className="flex items-center space-x-2">
                  <select className="bg-gray-700 text-white px-3 py-1 rounded-lg border border-gray-600">
                    <option>Todas</option>
                    <option>Instagram</option>
                    <option>TikTok</option>
                    <option>YouTube</option>
                  </select>
                  <button className="p-2 text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Conta</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rede</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Visualizações</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Curtidas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Comentários</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {accounts.map((account) => (
                    <tr key={account.id} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getPlatformColor(account.platform)}`}>
                            {getPlatformIcon(account.platform)}
                          </div>
                          <div>
                            <div className="font-medium text-white">{account.name}</div>
                            <div className="text-sm text-gray-400">{account.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="capitalize text-gray-300">{account.platform}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {formatNumber(account.stats.views)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {formatNumber(account.stats.likes)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {formatNumber(account.stats.comments)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-green-500 hover:text-green-400 text-sm">
                          Ver mais
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Video Format Modal */}
      <VideoFormatModal
        isOpen={showVideoFormatModal}
        onClose={() => setShowVideoFormatModal(false)}
        onContinue={handleVideoFormatContinue}
      />
    </div>
  )

  function handleVideoFormatContinue(format: string, mergeType: string) {
    setShowVideoFormatModal(false)
    toast.success(`Formato ${format} selecionado!`)
    // Aqui você pode adicionar lógica para processar o vídeo
  }
}
