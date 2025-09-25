'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  Star,
  Target,
  Filter,
  Search,
  Download,
  Play,
  Pause,
  RefreshCw,
  Globe,
  Clock,
  Users,
  BarChart3,
  Zap,
  Crown,
  Flame,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Minus,
  Instagram,
  Music,
  Youtube,
  ChevronRight,
  Info,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'
import { ViralTracker, ViralVideo, ViralTrend, NichoAnalysis } from '@/lib/viral-analysis/viral-tracker'

export default function ViralAnalysisPage() {
  const [viralVideos, setViralVideos] = useState<ViralVideo[]>([])
  const [trends, setTrends] = useState<ViralTrend[]>([])
  const [nichoAnalyses, setNichoAnalyses] = useState<NichoAnalysis[]>([])
  const [selectedNicho, setSelectedNicho] = useState('todos')
  const [selectedPlatform, setSelectedPlatform] = useState('todas')
  const [sortBy, setSortBy] = useState('potentialScore')
  const [isTracking, setIsTracking] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalVideos: 0,
    totalTrends: 0,
    averageViralScore: 0,
    topNicho: '',
    topPlatform: ''
  })

  useEffect(() => {
    loadViralData()
  }, [])

  const loadViralData = async () => {
    setIsLoading(true)
    try {
      const viralTracker = ViralTracker.getInstance()
      
      // Iniciar rastreamento se não estiver ativo
      if (!isTracking) {
        await viralTracker.startTracking()
        setIsTracking(true)
      }

      // Obter dados
      const videos = viralTracker.getTopViralVideos(50)
      const activeTrends = viralTracker.getActiveTrends()
      const generalStats = viralTracker.getGeneralStats()
      
      setViralVideos(videos)
      setTrends(activeTrends)
      setStats(generalStats)
      
      // Obter análises por nicho
      const nichos = ['fitness', 'comida', 'tech', 'lifestyle', 'educacao', 'entretenimento']
      const analyses = nichos.map(nicho => viralTracker.getNichoAnalysis(nicho)).filter(Boolean) as NichoAnalysis[]
      setNichoAnalyses(analyses)
      
    } catch (error) {
      toast.error('Erro ao carregar análise viral')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    await loadViralData()
    toast.success('Dados atualizados!')
  }

  const handleExportData = () => {
    const data = {
      videos: viralVideos,
      trends: trends,
      analyses: nichoAnalyses,
      stats: stats,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `viral-analysis-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Dados exportados com sucesso!')
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-4 h-4" />
      case 'tiktok': return <Music className="w-4 h-4" />
      case 'youtube': return <Youtube className="w-4 h-4" />
      default: return <Globe className="w-4 h-4" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'text-pink-500'
      case 'tiktok': return 'text-black'
      case 'youtube': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getNichoColor = (nicho: string) => {
    const colors: { [key: string]: string } = {
      'fitness': 'text-red-500',
      'comida': 'text-orange-500',
      'tech': 'text-blue-500',
      'lifestyle': 'text-purple-500',
      'educacao': 'text-green-500',
      'entretenimento': 'text-yellow-500'
    }
    return colors[nicho] || 'text-gray-500'
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    if (score >= 50) return 'text-orange-500'
    return 'text-red-500'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <Crown className="w-4 h-4" />
    if (score >= 70) return <Flame className="w-4 h-4" />
    if (score >= 50) return <TrendingUp className="w-4 h-4" />
    return <TrendingDown className="w-4 h-4" />
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const filteredVideos = viralVideos.filter(video => {
    if (selectedNicho !== 'todos' && video.analysis.nicho !== selectedNicho) return false
    if (selectedPlatform !== 'todas' && video.platform !== selectedPlatform) return false
    return true
  })

  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortBy) {
      case 'potentialScore':
        return b.analysis.potentialScore - a.analysis.potentialScore
      case 'viralScore':
        return b.analysis.viralScore - a.analysis.viralScore
      case 'engagement':
        return b.metrics.engagement - a.metrics.engagement
      case 'views':
        return b.metrics.views - a.metrics.views
      default:
        return 0
    }
  })

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
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Análise Viral dos EUA</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isTracking ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-400">
                {isTracking ? 'Rastreando ativamente' : 'Rastreamento pausado'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Atualizar</span>
            </button>
            <button
              onClick={handleExportData}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Vídeos Analisados</p>
                <p className="text-2xl font-bold text-white">{stats.totalVideos}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tendências Ativas</p>
                <p className="text-2xl font-bold text-white">{stats.totalTrends}</p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Score Viral Médio</p>
                <p className="text-2xl font-bold text-white">{stats.averageViralScore.toFixed(1)}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Top Nicho</p>
                <p className="text-2xl font-bold text-white capitalize">{stats.topNicho}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Nicho</label>
              <select
                value={selectedNicho}
                onChange={(e) => setSelectedNicho(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="todos">Todos os Nichos</option>
                <option value="fitness">Fitness</option>
                <option value="comida">Comida</option>
                <option value="tech">Tech</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="educacao">Educação</option>
                <option value="entretenimento">Entretenimento</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Plataforma</label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="todas">Todas as Plataformas</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Ordenar por</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="potentialScore">Score de Potencial</option>
                <option value="viralScore">Score Viral</option>
                <option value="engagement">Engajamento</option>
                <option value="views">Visualizações</option>
              </select>
            </div>
          </div>
        </div>

        {/* Viral Videos */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 mb-8">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold">Vídeos Virais dos EUA ({sortedVideos.length})</h3>
            <p className="text-sm text-gray-400">Análise em tempo real de conteúdo viral</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vídeo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Plataforma</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nicho</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Engajamento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Score Viral</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sortedVideos.slice(0, 20).map((video) => (
                  <tr key={video.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white truncate max-w-xs">{video.title}</div>
                          <div className="text-sm text-gray-400">@{video.author.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-2 ${getPlatformColor(video.platform)}`}>
                        {getPlatformIcon(video.platform)}
                        <span className="capitalize">{video.platform}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`capitalize ${getNichoColor(video.analysis.nicho)}`}>
                        {video.analysis.nicho}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-white">
                        {formatNumber(video.metrics.engagement)}
                      </div>
                      <div className="text-sm text-gray-400">
                        {video.metrics.engagementRate.toFixed(1)}% taxa
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-2 ${getScoreColor(video.analysis.viralScore)}`}>
                        {getScoreIcon(video.analysis.viralScore)}
                        <span className="font-medium">{video.analysis.viralScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-500 hover:text-blue-400 text-sm">
                        Ver detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Tendências Ativas</h3>
            <div className="space-y-3">
              {trends.slice(0, 5).map((trend) => (
                <div key={trend.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{trend.trendName}</div>
                    <div className="text-sm text-gray-400">{trend.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-500">{trend.averageScore.toFixed(1)}</div>
                    <div className="text-xs text-gray-400">score</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Análise por Nicho</h3>
            <div className="space-y-3">
              {nichoAnalyses.slice(0, 5).map((analysis) => (
                <div key={analysis.nicho} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <div className="font-medium text-white capitalize">{analysis.nicho}</div>
                    <div className="text-sm text-gray-400">{analysis.totalVideos} vídeos</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-500">{formatNumber(analysis.averageEngagement)}</div>
                    <div className="text-xs text-gray-400">engajamento</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Insights da Análise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-green-500 mb-2">Top Hashtags</h4>
              <div className="flex flex-wrap gap-2">
                {['#fitness', '#viral', '#motivation', '#transformation', '#usa'].map((hashtag, index) => (
                  <span key={index} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-medium text-blue-500 mb-2">Melhores Horários</h4>
              <div className="space-y-2">
                {['18:00', '19:00', '20:00', '21:00'].map((hour, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">{hour}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

