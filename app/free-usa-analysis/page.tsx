'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, 
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
  AlertCircle,
  CheckCircle,
  X,
  DollarSign,
  Shield
} from 'lucide-react'
import toast from 'react-hot-toast'
import { FreeUSATracker } from '@/lib/viral-analysis/free-usa-tracker'

export default function FreeUSAAnalysisPage() {
  const [isTracking, setIsTracking] = useState(false)
  const [trendingHashtags, setTrendingHashtags] = useState<{ [nicho: string]: string[] }>({})
  const [selectedNicho, setSelectedNicho] = useState<string>('fitness')
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly'>('weekly')
  const [viralVideos, setViralVideos] = useState<any[]>([])
  const [engagement, setEngagement] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    setIsLoading(true)
    try {
      const tracker = FreeUSATracker.getInstance()
      
      // Carregar dados iniciais
      const hashtags = await tracker.getTrendingHashtags()
      const videos = await tracker.getViralVideos()
      const engagementData = await tracker.analyzeEngagement()
      const trackerStats = tracker.getStats()
      
      setTrendingHashtags(hashtags)
      setViralVideos(videos)
      setEngagement(engagementData)
      setStats(trackerStats)
      
    } catch (error) {
      toast.error('Erro ao carregar dados')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartTracking = async () => {
    try {
      const tracker = FreeUSATracker.getInstance()
      await tracker.startFreeTracking()
      setIsTracking(true)
      toast.success('Rastreamento gratuito iniciado!')
    } catch (error) {
      toast.error('Erro ao iniciar rastreamento')
    }
  }

  const handleStopTracking = () => {
    const tracker = FreeUSATracker.getInstance()
    tracker.stopTracking()
    setIsTracking(false)
    toast.success('Rastreamento parado')
  }

  const handleRefresh = async () => {
    await loadInitialData()
    toast.success('Dados atualizados!')
  }

  const handleExportData = () => {
    const data = {
      hashtags: trendingHashtags,
      videos: viralVideos,
      engagement: engagement,
      stats: stats,
      timestamp: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `free-usa-analysis-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Dados exportados com sucesso!')
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    if (score >= 50) return 'text-orange-500'
    return 'text-red-500'
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
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Análise TikTok/Instagram EUA</span>
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
        {/* Free Method Info */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-500">Método Gratuito Ativo</h3>
              <p className="text-gray-300">
                Rastreamento TikTok e Instagram dos EUA via APIs gratuitas
              </p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-300">TikTok Research API (gratuito)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-300">Instagram Basic Display API (gratuito)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-300">Análise de hashtags TikTok/Instagram</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-300">Dados específicos dos EUA</span>
            </div>
          </div>
        </div>

        {/* Limitations */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-500">Limitações do Método Gratuito</h3>
              <p className="text-gray-300">
                Dados básicos via APIs públicas - para análise completa, considere o plano pago
              </p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <X className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-300">Sem acesso a contas privadas</span>
            </div>
            <div className="flex items-center space-x-2">
              <X className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-300">Limite de requests por dia</span>
            </div>
            <div className="flex items-center space-x-2">
              <X className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-300">Análise superficial</span>
            </div>
            <div className="flex items-center space-x-2">
              <X className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-300">Sem dados de engajamento detalhado</span>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Controle de Rastreamento</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Método: APIs Públicas</span>
              <span className="text-sm text-green-500">Custo: R$ 0,00</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {!isTracking ? (
              <button
                onClick={handleStartTracking}
                className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Iniciar Rastreamento</span>
              </button>
            ) : (
              <button
                onClick={handleStopTracking}
                className="flex items-center space-x-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <Pause className="w-4 h-4" />
                <span>Parar Rastreamento</span>
              </button>
            )}
            
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Atualizar Dados</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Hashtags Trending</p>
                <p className="text-2xl font-bold text-white">{trendingHashtags.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Vídeos Analisados</p>
                <p className="text-2xl font-bold text-white">{viralVideos.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Engajamento Médio</p>
                <p className="text-2xl font-bold text-white">
                  {engagement?.averageEngagement?.toFixed(1) || '0.0'}%
                </p>
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
                <p className="text-2xl font-bold text-white capitalize">
                  {engagement?.topNicho || 'N/A'}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Nicho</label>
              <select
                value={selectedNicho}
                onChange={(e) => setSelectedNicho(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="fitness">Fitness</option>
                <option value="comida">Comida</option>
                <option value="tech">Tech</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="educacao">Educação</option>
                <option value="entretenimento">Entretenimento</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Período</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as 'weekly' | 'monthly')}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trending Hashtags por Nicho */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Hashtags Trending por Nicho</h3>
            <div className="text-sm text-gray-400">
              {selectedPeriod === 'weekly' ? 'Última semana' : 'Último mês'}
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">
              Hashtags para {selectedNicho.charAt(0).toUpperCase() + selectedNicho.slice(1)}
            </h4>
            <div className="flex flex-wrap gap-2">
              {trendingHashtags[selectedNicho]?.map((hashtag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30"
                >
                  {hashtag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h5 className="font-medium text-green-500 mb-2">TikTok</h5>
              <div className="flex flex-wrap gap-1">
                {trendingHashtags[selectedNicho]?.filter(h => h.includes('fyp') || h.includes('foryou')).map((hashtag, index) => (
                  <span key={index} className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <h5 className="font-medium text-pink-500 mb-2">Instagram</h5>
              <div className="flex flex-wrap gap-1">
                {trendingHashtags[selectedNicho]?.filter(h => h.includes('reels') || h.includes('instagram')).map((hashtag, index) => (
                  <span key={index} className="px-2 py-1 bg-pink-500/20 text-pink-300 text-xs rounded">
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Viral Videos */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 mb-8">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Vídeos Virais Detectados</h3>
                <p className="text-sm text-gray-400">
                  Análise via APIs públicas gratuitas - {selectedPeriod === 'weekly' ? 'Última semana' : 'Último mês'}
                </p>
              </div>
              <div className="text-sm text-gray-400">
                {viralVideos.length} vídeos encontrados
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vídeo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Plataforma</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nicho</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Visualizações</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Engajamento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Score Viral</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {viralVideos.map((video, index) => (
                  <tr key={index} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white truncate max-w-xs">{video.title}</div>
                          <div className="text-sm text-gray-400">Via API Pública</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {video.platform === 'youtube' ? (
                          <Youtube className="w-4 h-4 text-red-500" />
                        ) : (
                          <Music className="w-4 h-4 text-black" />
                        )}
                        <span className="capitalize text-gray-300">{video.platform}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize text-gray-300">{video.nicho}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {formatNumber(video.views)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-white">
                      {video.engagement.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-2 ${getScoreColor(video.viralScore)}`}>
                        <Flame className="w-4 h-4" />
                        <span className="font-medium">{video.viralScore}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upgrade Suggestion */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-500">Quer Análise Completa?</h3>
              <p className="text-gray-300">
                Upgrade para o plano Viral Analysis e tenha acesso a dados detalhados dos EUA
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center space-x-4">
            <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors">
              Upgrade para R$ 197/mês
            </button>
            <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
              Continuar Gratuito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
