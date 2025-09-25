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
  ChevronLeft
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface AnalyticsData {
  views: number
  likes: number
  comments: number
  reach: number
  impressions: number
}

interface AccountPerformance {
  account: string
  network: string
  views: string
  likes: string
  comments: string
}

export default function AnalyticsPage() {
  const router = useRouter()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    views: 432000,
    likes: 300000,
    comments: 20000,
    reach: 500000,
    impressions: 600000
  })
  const [accountPerformance, setAccountPerformance] = useState<AccountPerformance[]>([
    {
      account: '@cortesx3d',
      network: 'TikTok',
      views: '321M',
      likes: '321M',
      comments: '20M'
    }
  ])
  const [selectedPeriod, setSelectedPeriod] = useState('7d')

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getNetworkIcon = (network: string) => {
    switch (network.toLowerCase()) {
      case 'tiktok':
        return <Music className="w-4 h-4" />
      case 'instagram':
        return <Instagram className="w-4 h-4" />
      case 'youtube':
        return <Youtube className="w-4 h-4" />
      default:
        return <BarChart3 className="w-4 h-4" />
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
            <div className="text-sm text-green-400 mb-2">Passo 4 ►</div>
            
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
            <div className="text-green-400 text-sm mb-2">Quarto passo</div>
            <h1 className="text-4xl font-bold mb-4">Companhe o sucesso dos seus cortes</h1>
            <p className="text-xl text-gray-300">
              Agora você pode acompanhar cada detalhe das suas publicações por meio de um analytics completo
            </p>
          </div>

          {/* Video Preview */}
          <div className="mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start space-x-6">
                {/* Video Thumbnail */}
                <div className="w-64 h-48 bg-gray-700 rounded-lg flex items-center justify-center relative">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-xs">
                    0:30
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Quando eu era criança minha mãe não gostava de mim.</h3>
                  
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-500">{formatNumber(analyticsData.views)}</div>
                      <div className="text-sm text-gray-400">Views</div>
                    </div>
                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-500">{formatNumber(analyticsData.likes)}</div>
                      <div className="text-sm text-gray-400">Curtidas</div>
                    </div>
                    <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-500">{formatNumber(analyticsData.comments)}</div>
                      <div className="text-sm text-gray-400">Comentários</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Views by Network Chart */}
          <div className="mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-6">Views por rede social</h3>
              
              {/* Chart Placeholder */}
              <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400">Gráfico de views por rede social</p>
                  <p className="text-sm text-gray-500">TikTok vs Instagram</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Performance Table */}
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Performance por Conta</h3>
                <div className="flex items-center space-x-2">
                  <select className="bg-gray-700 text-white px-3 py-1 rounded-lg border border-gray-600">
                    <option>Todos</option>
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
                  {accountPerformance.map((account, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-white">{account.account}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getNetworkIcon(account.network)}
                          <span className="text-gray-300">{account.network}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {account.views}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {account.likes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {account.comments}
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
          </div>
        </div>
      </div>
    </div>
  )
}

