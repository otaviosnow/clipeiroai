'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home, BarChart3, TrendingUp, Users, Eye, Heart, MessageCircle } from 'lucide-react'

export default function AnalyticsPortugues() {
  const router = useRouter()
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    totalShares: 0,
    engagementRate: 0,
    topClips: [] as Array<{
      id: number;
      title: string;
      views: number;
      likes: number;
      comments: number;
      shares: number;
    }>
  })
  const [isLoading, setIsLoading] = useState(true)

  console.log('📊 Analytics page rendered')

  useEffect(() => {
    console.log('🔍 Loading analytics data...')
    
    // Simulate loading analytics
    setTimeout(() => {
      const mockAnalytics = {
        totalViews: 125000,
        totalLikes: 8500,
        totalComments: 1200,
        totalShares: 450,
        engagementRate: 8.2,
        topClips: [
          {
            id: 1,
            title: 'Dance Challenge',
            views: 25000,
            likes: 1800,
            comments: 120,
            shares: 45
          },
          {
            id: 2,
            title: 'Cooking Hack',
            views: 18000,
            likes: 1200,
            comments: 80,
            shares: 30
          },
          {
            id: 3,
            title: 'Tech Review',
            views: 15000,
            likes: 900,
            comments: 60,
            shares: 25
          }
        ]
      }
      
      console.log('✅ Analytics data loaded:', mockAnalytics)
      setAnalytics(mockAnalytics)
      setIsLoading(false)
    }, 1000)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard-dark')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-blue-500" />
                <span className="text-xl font-bold">Analytics em Português</span>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/dashboard-dark')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Analytics em Português</h1>
          <p className="text-gray-400">
            Métricas detalhadas dos seus clipes e performance nas redes sociais
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total de Visualizações</p>
                <p className="text-2xl font-bold">{formatNumber(analytics.totalViews)}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Curtidas</p>
                <p className="text-2xl font-bold">{formatNumber(analytics.totalLikes)}</p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Comentários</p>
                <p className="text-2xl font-bold">{formatNumber(analytics.totalComments)}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Taxa de Engajamento</p>
                <p className="text-2xl font-bold">{analytics.engagementRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Top Clips */}
        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
          <h3 className="text-xl font-semibold mb-6">Top Clipes</h3>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-lg">Carregando dados...</div>
            </div>
          ) : (
            <div className="space-y-4">
              {analytics.topClips.map((clip, index) => (
                <div key={clip.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{clip.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{formatNumber(clip.views)} visualizações</span>
                        <span>{formatNumber(clip.likes)} curtidas</span>
                        <span>{formatNumber(clip.comments)} comentários</span>
                        <span>{formatNumber(clip.shares)} compartilhamentos</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Engajamento</div>
                    <div className="text-lg font-semibold">
                      {((clip.likes + clip.comments + clip.shares) / clip.views * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
