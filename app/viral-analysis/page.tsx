'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home, TrendingUp, Globe, Calendar, Filter } from 'lucide-react'

export default function ViralAnalysis() {
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState('weekly')
  const [selectedNicho, setSelectedNicho] = useState('all')
  const [viralData, setViralData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  console.log('📊 Viral Analysis page rendered')

  useEffect(() => {
    console.log('🔍 Loading viral data...')
    
    // Simulate loading viral data
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          title: 'Dance Challenge Viral',
          platform: 'TikTok',
          views: '2.5M',
          engagement: '15.2%',
          hashtags: ['#dance', '#challenge', '#viral'],
          niche: 'entertainment'
        },
        {
          id: 2,
          title: 'Cooking Hack',
          platform: 'Instagram',
          views: '1.8M',
          engagement: '12.8%',
          hashtags: ['#cooking', '#hack', '#food'],
          niche: 'lifestyle'
        },
        {
          id: 3,
          title: 'Tech Review',
          platform: 'TikTok',
          views: '3.2M',
          engagement: '18.5%',
          hashtags: ['#tech', '#review', '#gadgets'],
          niche: 'technology'
        }
      ]
      
      console.log('✅ Viral data loaded:', mockData)
      setViralData(mockData)
      setIsLoading(false)
    }, 1000)
  }, [selectedPeriod, selectedNicho])

  const handlePeriodChange = (period: string) => {
    console.log('📅 Period changed to:', period)
    setSelectedPeriod(period)
    setIsLoading(true)
  }

  const handleNichoChange = (nicho: string) => {
    console.log('🎯 Nicho changed to:', nicho)
    setSelectedNicho(nicho)
    setIsLoading(true)
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
                <TrendingUp className="w-6 h-6 text-blue-500" />
                <span className="text-xl font-bold">Análise Viral EUA</span>
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
          <h1 className="text-3xl font-bold mb-4">Análise Viral dos EUA</h1>
          <p className="text-gray-400">
            Rastreamento de tendências em tempo real no TikTok e Instagram dos Estados Unidos
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <select
                value={selectedPeriod}
                onChange={(e) => handlePeriodChange(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-purple-500" />
              <select
                value={selectedNicho}
                onChange={(e) => handleNichoChange(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Todos os Nichos</option>
                <option value="entertainment">Entretenimento</option>
                <option value="lifestyle">Estilo de Vida</option>
                <option value="technology">Tecnologia</option>
                <option value="fitness">Fitness</option>
                <option value="food">Comida</option>
              </select>
            </div>
          </div>
        </div>

        {/* Viral Content */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-xl">Carregando dados virais...</div>
          </div>
        ) : (
          <div className="space-y-6">
            {viralData.map((item) => (
              <div key={item.id} className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Globe className="w-4 h-4" />
                        <span>{item.platform}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{item.views} visualizações</span>
                      </div>
                      <span>Engajamento: {item.engagement}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    {item.niche}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {item.hashtags.map((hashtag, index) => (
                    <span key={index} className="bg-gray-800 text-blue-400 px-3 py-1 rounded-full text-sm">
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
