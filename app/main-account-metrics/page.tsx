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
  Filter,
  MoreHorizontal,
  ChevronLeft,
  Target,
  Users,
  Zap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface MainAccountData {
  views: number
  likes: number
  comments: number
  followers: number
  reach: number
  impressions: number
}

interface ChartData {
  month: string
  views: number
  likes: number
  comments: number
}

export default function MainAccountMetricsPage() {
  const router = useRouter()
  const [accountData, setAccountData] = useState<MainAccountData>({
    views: 150000,
    likes: 120000,
    comments: 5000,
    followers: 50000,
    reach: 200000,
    impressions: 300000
  })
  const [chartData, setChartData] = useState<ChartData[]>([
    { month: 'Julho', views: 80000, likes: 60000, comments: 2000 },
    { month: 'Agosto', views: 95000, likes: 70000, comments: 2500 },
    { month: 'Setembro', views: 110000, likes: 85000, comments: 3000 },
    { month: 'Outubro', views: 130000, likes: 100000, comments: 4000 },
    { month: 'Novembro', views: 150000, likes: 120000, comments: 5000 }
  ])
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
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
            
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
              Upgrade
            </button>
            
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">MR</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
          <div className="p-6">
            <div className="text-sm text-green-400 mb-2">Passo 6 ►</div>
            
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Clipeiro</span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span>Home</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-green-500 text-white">
                <TrendingUp className="w-5 h-5" />
                <span>Analytics</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <Scissors className="w-5 h-5" />
                <span>Meus cortes</span>
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
                <span>Novo corte</span>
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
            <div className="text-green-400 text-sm mb-2">Passo 6</div>
            <h1 className="text-4xl font-bold mb-4">Acompanhe a sua conta</h1>
            <p className="text-xl text-gray-300 mb-2">
              Veja os dados da sua conta principal. Acompanhe as visualizações, alcance e engajamento.
            </p>
            <p className="text-gray-400">
              Veja o progresso da sua conta.
            </p>
          </div>

          {/* Views Progress */}
          <div className="mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-6">Avance nas visualizações</h3>
              
              {/* Progress Bar */}
              <div className="relative mb-6">
                <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000"
                    style={{ width: `${getProgressPercentage(accountData.views, 1000000)}%` }}
                  ></div>
                </div>
                
                {/* Milestones */}
                <div className="flex justify-between mt-4 text-sm text-gray-400">
                  <span>100 mil</span>
                  <span>1 milhão</span>
                  <span>5 milhões</span>
                  <span>10 milhões</span>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex space-x-2">
                <button className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedFilter === 'all' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}>
                  Todos os cortes
                </button>
                <button className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedFilter === 'instagram' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}>
                  Instagram
                </button>
                <button className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedFilter === 'tiktok' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}>
                  TikTok
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Views Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Visualizações</h3>
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-gray-700 text-white px-3 py-1 rounded-lg border border-gray-600 text-sm"
                >
                  <option value="7d">Últimos 7 dias</option>
                  <option value="30d">Últimos 30 dias</option>
                  <option value="90d">Últimos 90 dias</option>
                </select>
              </div>
              
              {/* Chart Placeholder */}
              <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Gráfico de visualizações</p>
                </div>
              </div>
            </motion.div>

            {/* Impressions Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Impressões</h3>
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-gray-700 text-white px-3 py-1 rounded-lg border border-gray-600 text-sm"
                >
                  <option value="7d">Últimos 7 dias</option>
                  <option value="30d">Últimos 30 dias</option>
                  <option value="90d">Últimos 90 dias</option>
                </select>
              </div>
              
              {/* Chart Placeholder */}
              <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Gráfico de impressões</p>
                </div>
              </div>
            </motion.div>

            {/* Likes Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Curtidas</h3>
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-gray-700 text-white px-3 py-1 rounded-lg border border-gray-600 text-sm"
                >
                  <option value="7d">Últimos 7 dias</option>
                  <option value="30d">Últimos 30 dias</option>
                  <option value="90d">Últimos 90 dias</option>
                </select>
              </div>
              
              {/* Chart Placeholder */}
              <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Gráfico de curtidas</p>
                </div>
              </div>
            </motion.div>

            {/* Comments Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Comentários</h3>
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-gray-700 text-white px-3 py-1 rounded-lg border border-gray-600 text-sm"
                >
                  <option value="7d">Últimos 7 dias</option>
                  <option value="30d">Últimos 30 dias</option>
                  <option value="90d">Últimos 90 dias</option>
                </select>
              </div>
              
              {/* Chart Placeholder */}
              <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Gráfico de comentários</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Account Summary */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-6">Resumo da Conta Principal</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">{formatNumber(accountData.views)}</div>
                <div className="text-gray-400 text-sm">Visualizações</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">{formatNumber(accountData.likes)}</div>
                <div className="text-gray-400 text-sm">Curtidas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">{formatNumber(accountData.comments)}</div>
                <div className="text-gray-400 text-sm">Comentários</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">{formatNumber(accountData.followers)}</div>
                <div className="text-gray-400 text-sm">Seguidores</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

