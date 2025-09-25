'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2,
  Users,
  Target,
  Calendar,
  Download,
  Filter,
  Search,
  ArrowUp,
  ArrowDown,
  Minus,
  Instagram,
  Youtube,
  Music
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { AnalyticsManager, RelatorioAnalytics, MetricasClip } from '@/lib/analytics/analytics-manager'
import NavigationHeader from '@/components/NavigationHeader'

export default function AnalyticsPortuguesPage() {
  const router = useRouter()
  const [relatorio, setRelatorio] = useState<RelatorioAnalytics | null>(null)
  const [metricasClips, setMetricasClips] = useState<MetricasClip[]>([])
  const [filtroPlataforma, setFiltroPlataforma] = useState('todas')
  const [filtroNicho, setFiltroNicho] = useState('todos')
  const [periodo, setPeriodo] = useState('30d')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [periodo])

  const loadAnalytics = async () => {
    setIsLoading(true)
    try {
      const analyticsManager = AnalyticsManager.getInstance()
      
      // Gerar dados simulados se não existirem
      if (analyticsManager.getMetricsByPlatform('instagram').length === 0) {
        AnalyticsManager.generateMockData()
      }

      const relatorioData = analyticsManager.generateReport(periodo)
      setRelatorio(relatorioData)
      
      const metricasData = analyticsManager.getMetricsByPlatform(filtroPlataforma)
      setMetricasClips(metricasData)
      
    } catch (error) {
      console.error('Erro ao carregar analytics:', error)
      toast.error('Erro ao carregar dados de analytics')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportReport = () => {
    if (!relatorio) return
    
    analyticsManager.exportReportToEmail('usuario@exemplo.com', relatorio)
    toast.success('Relatório enviado por email!')
  }

  const getPlataformaIcon = (plataforma: string) => {
    switch (plataforma) {
      case 'instagram': return <Instagram className="w-4 h-4" />
      case 'tiktok': return <Music className="w-4 h-4" />
      case 'youtube': return <Youtube className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const getPlataformaColor = (plataforma: string) => {
    switch (plataforma) {
      case 'instagram': return 'text-pink-500'
      case 'tiktok': return 'text-black'
      case 'youtube': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getTrendIcon = (value: number) => {
    if (value > 0) return <ArrowUp className="w-4 h-4 text-green-500" />
    if (value < 0) return <ArrowDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-500" />
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
      <NavigationHeader 
        title="Analytics em Português"
        icon={<BarChart3 className="w-5 h-5 text-white" />}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Período</label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Plataforma</label>
              <select
                value={filtroPlataforma}
                onChange={(e) => setFiltroPlataforma(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="todas">Todas as plataformas</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Nicho</label>
              <select
                value={filtroNicho}
                onChange={(e) => setFiltroNicho(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="todos">Todos os nichos</option>
                <option value="fitness">Fitness</option>
                <option value="comida">Comida</option>
                <option value="tech">Tecnologia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Métricas Principais */}
        {relatorio && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-300">Visualizações</span>
                </div>
                {getTrendIcon(relatorio.crescimentoVisualizacoes)}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {relatorio.totalVisualizacoes.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                {relatorio.crescimentoVisualizacoes > 0 ? '+' : ''}{relatorio.crescimentoVisualizacoes}% vs período anterior
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-medium text-gray-300">Curtidas</span>
                </div>
                {getTrendIcon(relatorio.crescimentoCurtidas)}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {relatorio.totalCurtidas.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                {relatorio.crescimentoCurtidas > 0 ? '+' : ''}{relatorio.crescimentoCurtidas}% vs período anterior
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-300">Comentários</span>
                </div>
                {getTrendIcon(relatorio.crescimentoComentarios)}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {relatorio.totalComentarios.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                {relatorio.crescimentoComentarios > 0 ? '+' : ''}{relatorio.crescimentoComentarios}% vs período anterior
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Share2 className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium text-gray-300">Compartilhamentos</span>
                </div>
                {getTrendIcon(relatorio.crescimentoCompartilhamentos)}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {relatorio.totalCompartilhamentos.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">
                {relatorio.crescimentoCompartilhamentos > 0 ? '+' : ''}{relatorio.crescimentoCompartilhamentos}% vs período anterior
              </div>
            </div>
          </div>
        )}

        {/* Tabela de Clips */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Métricas por Clip</h3>
              <button
                onClick={handleExportReport}
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Exportar Relatório</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Clip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Plataforma
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Visualizações
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Curtidas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Comentários
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Compartilhamentos
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {metricasClips.map((clip, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-white">
                            Clip {index + 1}
                          </div>
                          <div className="text-sm text-gray-400">
                            {clip.nicho}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getPlataformaIcon(clip.plataforma)}
                        <span className={`text-sm font-medium ${getPlataformaColor(clip.plataforma)}`}>
                          {clip.plataforma}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {clip.visualizacoes.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {clip.curtidas.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {clip.comentarios.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {clip.compartilhamentos.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}