export interface ViralVideo {
  id: string
  url: string
  platform: 'instagram' | 'tiktok' | 'youtube'
  title: string
  description: string
  author: {
    username: string
    displayName: string
    followers: number
    verified: boolean
  }
  metrics: {
    views: number
    likes: number
    comments: number
    shares: number
    engagement: number
    engagementRate: number
  }
  content: {
    duration: number
    format: 'vertical' | 'horizontal' | 'square'
    hashtags: string[]
    mentions: string[]
    music: string
    effects: string[]
  }
  analysis: {
    nicho: string
    viralScore: number
    trendingScore: number
    originalityScore: number
    qualityScore: number
    potentialScore: number
  }
  timestamps: {
    posted: Date
    discovered: Date
    analyzed: Date
  }
  location: {
    country: string
    state: string
    city: string
  }
  tags: string[]
  insights: string[]
}

export interface ViralTrend {
  id: string
  nicho: string
  platform: string
  trendName: string
  description: string
  viralVideos: string[]
  totalEngagement: number
  averageScore: number
  growthRate: number
  peakTime: string
  duration: number
  hashtags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface NichoAnalysis {
  nicho: string
  totalVideos: number
  averageEngagement: number
  topHashtags: { hashtag: string; count: number }[]
  topFormats: { format: string; count: number }[]
  topDurations: { duration: string; count: number }[]
  peakHours: { hour: string; engagement: number }[]
  topCreators: { username: string; followers: number; viralCount: number }[]
  trendingTopics: string[]
  viralPatterns: string[]
}

export class ViralTracker {
  private static instance: ViralTracker
  private viralVideos: ViralVideo[]
  private trends: ViralTrend[]
  private nichoAnalyses: NichoAnalysis[]
  private isTracking: boolean
  private trackingInterval: NodeJS.Timeout | null

  constructor() {
    this.viralVideos = []
    this.trends = []
    this.nichoAnalyses = []
    this.isTracking = false
    this.trackingInterval = null
  }

  static getInstance(): ViralTracker {
    if (!ViralTracker.instance) {
      ViralTracker.instance = new ViralTracker()
    }
    return ViralTracker.instance
  }

  // Iniciar rastreamento de vídeos virais
  async startTracking(): Promise<void> {
    if (this.isTracking) return

    this.isTracking = true
    console.log('🔍 Iniciando rastreamento de vídeos virais...')

    // Simular rastreamento contínuo
    this.trackingInterval = setInterval(async () => {
      await this.scanForViralContent()
    }, 300000) // A cada 5 minutos

    // Primeira varredura
    await this.scanForViralContent()
  }

  // Parar rastreamento
  stopTracking(): void {
    if (this.trackingInterval) {
      clearInterval(this.trackingInterval)
      this.trackingInterval = null
    }
    this.isTracking = false
    console.log('⏹️ Rastreamento parado')
  }

  // Escanear conteúdo viral
  private async scanForViralContent(): Promise<void> {
    try {
      // Simular descoberta de vídeos virais
      const newViralVideos = await this.discoverViralVideos()
      
      for (const video of newViralVideos) {
        await this.analyzeVideo(video)
        this.viralVideos.push(video)
      }

      // Atualizar tendências
      await this.updateTrends()
      
      // Atualizar análises por nicho
      await this.updateNichoAnalyses()

      console.log(`📊 Descobertos ${newViralVideos.length} novos vídeos virais`)
    } catch (error) {
      console.error('Erro ao escanear conteúdo viral:', error)
    }
  }

  // Descobrir vídeos virais (simulado)
  private async discoverViralVideos(): Promise<ViralVideo[]> {
    // Simular descoberta de vídeos virais dos EUA
    const mockViralVideos: ViralVideo[] = [
      {
        id: `viral_${Date.now()}_1`,
        url: 'https://instagram.com/p/example1',
        platform: 'instagram',
        title: 'Fitness Challenge Goes Viral',
        description: 'Amazing fitness transformation that inspired thousands',
        author: {
          username: '@fitnessguru_usa',
          displayName: 'Fitness Guru USA',
          followers: 2500000,
          verified: true
        },
        metrics: {
          views: 15000000,
          likes: 1200000,
          comments: 45000,
          shares: 89000,
          engagement: 1334000,
          engagementRate: 8.9
        },
        content: {
          duration: 30,
          format: 'vertical',
          hashtags: ['#fitness', '#transformation', '#motivation', '#usa'],
          mentions: ['@gym', '@nutrition'],
          music: 'Trending Beat',
          effects: ['slow-motion', 'zoom', 'text-overlay']
        },
        analysis: {
          nicho: 'fitness',
          viralScore: 95,
          trendingScore: 88,
          originalityScore: 75,
          qualityScore: 92,
          potentialScore: 90
        },
        timestamps: {
          posted: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
          discovered: new Date(),
          analyzed: new Date()
        },
        location: {
          country: 'United States',
          state: 'California',
          city: 'Los Angeles'
        },
        tags: ['fitness', 'transformation', 'motivation', 'viral'],
        insights: [
          'High engagement rate indicates strong audience connection',
          'Vertical format optimized for mobile viewing',
          'Slow-motion effect creates dramatic impact',
          'Fitness niche shows consistent viral potential'
        ]
      },
      {
        id: `viral_${Date.now()}_2`,
        url: 'https://tiktok.com/@example2',
        platform: 'tiktok',
        title: 'Cooking Hack That Changed Everything',
        description: 'Simple cooking trick that everyone needs to know',
        author: {
          username: '@chef_america',
          displayName: 'Chef America',
          followers: 1800000,
          verified: true
        },
        metrics: {
          views: 25000000,
          likes: 2100000,
          comments: 120000,
          shares: 150000,
          engagement: 2370000,
          engagementRate: 9.5
        },
        content: {
          duration: 45,
          format: 'vertical',
          hashtags: ['#cooking', '#hack', '#food', '#kitchen'],
          mentions: ['@foodnetwork'],
          music: 'Upbeat Cooking Music',
          effects: ['zoom', 'text-overlay', 'highlight']
        },
        analysis: {
          nicho: 'comida',
          viralScore: 98,
          trendingScore: 95,
          originalityScore: 85,
          qualityScore: 88,
          potentialScore: 94
        },
        timestamps: {
          posted: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
          discovered: new Date(),
          analyzed: new Date()
        },
        location: {
          country: 'United States',
          state: 'New York',
          city: 'New York City'
        },
        tags: ['cooking', 'hack', 'food', 'kitchen', 'viral'],
        insights: [
          'Extremely high engagement rate for food content',
          'Simple hack format resonates with audience',
          'Vertical format perfect for TikTok algorithm',
          'Food niche shows massive viral potential'
        ]
      }
    ]

    return mockViralVideos
  }

  // Analisar vídeo individual
  private async analyzeVideo(video: ViralVideo): Promise<void> {
    // Simular análise de IA
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Calcular scores baseados nas métricas
    video.analysis.viralScore = this.calculateViralScore(video.metrics)
    video.analysis.trendingScore = this.calculateTrendingScore(video.metrics)
    video.analysis.originalityScore = this.calculateOriginalityScore(video.content)
    video.analysis.qualityScore = this.calculateQualityScore(video.content)
    video.analysis.potentialScore = this.calculatePotentialScore(video)
    
    // Gerar insights
    video.insights = this.generateInsights(video)
  }

  // Calcular score viral
  private calculateViralScore(metrics: ViralVideo['metrics']): number {
    const engagementWeight = 0.4
    const viewsWeight = 0.3
    const engagementRateWeight = 0.3
    
    const normalizedEngagement = Math.min(metrics.engagement / 1000000, 1) * 100
    const normalizedViews = Math.min(metrics.views / 10000000, 1) * 100
    const normalizedEngagementRate = Math.min(metrics.engagementRate, 1) * 100
    
    return Math.round(
      normalizedEngagement * engagementWeight +
      normalizedViews * viewsWeight +
      normalizedEngagementRate * engagementRateWeight
    )
  }

  // Calcular score de tendência
  private calculateTrendingScore(metrics: ViralVideo['metrics']): number {
    // Baseado na velocidade de crescimento
    const growthRate = metrics.engagement / metrics.views
    return Math.round(growthRate * 100)
  }

  // Calcular score de originalidade
  private calculateOriginalityScore(content: ViralVideo['content']): number {
    // Baseado na diversidade de elementos
    const hashtagDiversity = Math.min(content.hashtags.length / 10, 1) * 100
    const effectDiversity = Math.min(content.effects.length / 5, 1) * 100
    const contentDiversity = Math.min((content.hashtags.length + content.effects.length) / 15, 1) * 100
    
    return Math.round((hashtagDiversity + effectDiversity + contentDiversity) / 3)
  }

  // Calcular score de qualidade
  private calculateQualityScore(content: ViralVideo['content']): number {
    // Baseado na duração e formato
    const durationScore = content.duration >= 15 && content.duration <= 60 ? 100 : 70
    const formatScore = content.format === 'vertical' ? 100 : 80
    
    return Math.round((durationScore + formatScore) / 2)
  }

  // Calcular score de potencial
  private calculatePotentialScore(video: ViralVideo): number {
    const weights = {
      viral: 0.3,
      trending: 0.25,
      originality: 0.2,
      quality: 0.25
    }
    
    return Math.round(
      video.analysis.viralScore * weights.viral +
      video.analysis.trendingScore * weights.trending +
      video.analysis.originalityScore * weights.originality +
      video.analysis.qualityScore * weights.quality
    )
  }

  // Gerar insights
  private generateInsights(video: ViralVideo): string[] {
    const insights: string[] = []
    
    if (video.analysis.viralScore > 90) {
      insights.push('Conteúdo com potencial viral extremamente alto')
    }
    
    if (video.analysis.engagementRate > 8) {
      insights.push('Taxa de engajamento excepcional para o nicho')
    }
    
    if (video.content.format === 'vertical') {
      insights.push('Formato vertical otimizado para mobile')
    }
    
    if (video.content.duration <= 30) {
      insights.push('Duração ideal para retenção de atenção')
    }
    
    if (video.author.verified) {
      insights.push('Criador verificado com credibilidade alta')
    }
    
    return insights
  }

  // Atualizar tendências
  private async updateTrends(): Promise<void> {
    // Agrupar vídeos por nicho e plataforma
    const groupedVideos = this.viralVideos.reduce((acc, video) => {
      const key = `${video.analysis.nicho}_${video.platform}`
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(video)
      return acc
    }, {} as { [key: string]: ViralVideo[] })

    // Criar tendências
    for (const [key, videos] of Object.entries(groupedVideos)) {
      const [nicho, platform] = key.split('_')
      
      const trend: ViralTrend = {
        id: `trend_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        nicho,
        platform,
        trendName: `${nicho} trending on ${platform}`,
        description: `Trending ${nicho} content on ${platform}`,
        viralVideos: videos.map(v => v.id),
        totalEngagement: videos.reduce((acc, v) => acc + v.metrics.engagement, 0),
        averageScore: videos.reduce((acc, v) => acc + v.analysis.potentialScore, 0) / videos.length,
        growthRate: this.calculateGrowthRate(videos),
        peakTime: this.calculatePeakTime(videos),
        duration: this.calculateTrendDuration(videos),
        hashtags: this.extractTrendingHashtags(videos),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      this.trends.push(trend)
    }
  }

  // Atualizar análises por nicho
  private async updateNichoAnalyses(): Promise<void> {
    const nichos = [...new Set(this.viralVideos.map(v => v.analysis.nicho))]
    
    for (const nicho of nichos) {
      const nichoVideos = this.viralVideos.filter(v => v.analysis.nicho === nicho)
      
      const analysis: NichoAnalysis = {
        nicho,
        totalVideos: nichoVideos.length,
        averageEngagement: nichoVideos.reduce((acc, v) => acc + v.metrics.engagement, 0) / nichoVideos.length,
        topHashtags: this.getTopHashtags(nichoVideos),
        topFormats: this.getTopFormats(nichoVideos),
        topDurations: this.getTopDurations(nichoVideos),
        peakHours: this.getPeakHours(nichoVideos),
        topCreators: this.getTopCreators(nichoVideos),
        trendingTopics: this.getTrendingTopics(nichoVideos),
        viralPatterns: this.getViralPatterns(nichoVideos)
      }
      
      this.nichoAnalyses.push(analysis)
    }
  }

  // Métodos auxiliares
  private calculateGrowthRate(videos: ViralVideo[]): number {
    // Simular cálculo de taxa de crescimento
    return Math.random() * 100
  }

  private calculatePeakTime(videos: ViralVideo[]): string {
    // Simular cálculo de horário de pico
    const hours = ['18:00', '19:00', '20:00', '21:00']
    return hours[Math.floor(Math.random() * hours.length)]
  }

  private calculateTrendDuration(videos: ViralVideo[]): number {
    // Simular duração da tendência em horas
    return Math.floor(Math.random() * 48) + 12
  }

  private extractTrendingHashtags(videos: ViralVideo[]): string[] {
    const hashtagCounts: { [key: string]: number } = {}
    
    videos.forEach(video => {
      video.content.hashtags.forEach(hashtag => {
        hashtagCounts[hashtag] = (hashtagCounts[hashtag] || 0) + 1
      })
    })
    
    return Object.entries(hashtagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([hashtag]) => hashtag)
  }

  private getTopHashtags(videos: ViralVideo[]): { hashtag: string; count: number }[] {
    const hashtagCounts: { [key: string]: number } = {}
    
    videos.forEach(video => {
      video.content.hashtags.forEach(hashtag => {
        hashtagCounts[hashtag] = (hashtagCounts[hashtag] || 0) + 1
      })
    })
    
    return Object.entries(hashtagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([hashtag, count]) => ({ hashtag, count }))
  }

  private getTopFormats(videos: ViralVideo[]): { format: string; count: number }[] {
    const formatCounts: { [key: string]: number } = {}
    
    videos.forEach(video => {
      formatCounts[video.content.format] = (formatCounts[video.content.format] || 0) + 1
    })
    
    return Object.entries(formatCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([format, count]) => ({ format, count }))
  }

  private getTopDurations(videos: ViralVideo[]): { duration: string; count: number }[] {
    const durationRanges: { [key: string]: number } = {
      '0-15s': 0,
      '16-30s': 0,
      '31-60s': 0,
      '60s+': 0
    }
    
    videos.forEach(video => {
      if (video.content.duration <= 15) durationRanges['0-15s']++
      else if (video.content.duration <= 30) durationRanges['16-30s']++
      else if (video.content.duration <= 60) durationRanges['31-60s']++
      else durationRanges['60s+']++
    })
    
    return Object.entries(durationRanges)
      .sort(([,a], [,b]) => b - a)
      .map(([duration, count]) => ({ duration, count }))
  }

  private getPeakHours(videos: ViralVideo[]): { hour: string; engagement: number }[] {
    // Simular dados de horários de pico
    return [
      { hour: '18:00', engagement: 1500000 },
      { hour: '19:00', engagement: 1800000 },
      { hour: '20:00', engagement: 2000000 },
      { hour: '21:00', engagement: 1600000 }
    ]
  }

  private getTopCreators(videos: ViralVideo[]): { username: string; followers: number; viralCount: number }[] {
    const creatorCounts: { [key: string]: { followers: number; viralCount: number } } = {}
    
    videos.forEach(video => {
      const username = video.author.username
      if (!creatorCounts[username]) {
        creatorCounts[username] = { followers: video.author.followers, viralCount: 0 }
      }
      creatorCounts[username].viralCount++
    })
    
    return Object.entries(creatorCounts)
      .sort(([,a], [,b]) => b.viralCount - a.viralCount)
      .slice(0, 10)
      .map(([username, data]) => ({ username, ...data }))
  }

  private getTrendingTopics(videos: ViralVideo[]): string[] {
    // Simular tópicos em tendência
    return [
      'fitness transformation',
      'cooking hacks',
      'life tips',
      'motivation',
      'beauty secrets'
    ]
  }

  private getViralPatterns(videos: ViralVideo[]): string[] {
    // Simular padrões virais
    return [
      'Vertical format with text overlay',
      'Slow-motion effects',
      'Trending music',
      'Hashtag strategy',
      'Engagement optimization'
    ]
  }

  // Obter vídeos virais por nicho
  getViralVideosByNicho(nicho: string): ViralVideo[] {
    return this.viralVideos.filter(video => video.analysis.nicho === nicho)
  }

  // Obter vídeos virais por plataforma
  getViralVideosByPlatform(platform: string): ViralVideo[] {
    return this.viralVideos.filter(video => video.platform === platform)
  }

  // Obter top vídeos virais
  getTopViralVideos(limit: number = 10): ViralVideo[] {
    return this.viralVideos
      .sort((a, b) => b.analysis.potentialScore - a.analysis.potentialScore)
      .slice(0, limit)
  }

  // Obter tendências ativas
  getActiveTrends(): ViralTrend[] {
    return this.trends.filter(trend => 
      new Date().getTime() - trend.createdAt.getTime() < 24 * 60 * 60 * 1000 // Últimas 24 horas
    )
  }

  // Obter análise por nicho
  getNichoAnalysis(nicho: string): NichoAnalysis | undefined {
    return this.nichoAnalyses.find(analysis => analysis.nicho === nicho)
  }

  // Obter estatísticas gerais
  getGeneralStats(): {
    totalVideos: number
    totalTrends: number
    averageViralScore: number
    topNicho: string
    topPlatform: string
  } {
    const totalVideos = this.viralVideos.length
    const totalTrends = this.trends.length
    const averageViralScore = totalVideos > 0 
      ? this.viralVideos.reduce((acc, v) => acc + v.analysis.viralScore, 0) / totalVideos
      : 0
    
    const nichoCounts = this.viralVideos.reduce((acc, v) => {
      acc[v.analysis.nicho] = (acc[v.analysis.nicho] || 0) + 1
      return acc
    }, {} as { [key: string]: number })
    
    const platformCounts = this.viralVideos.reduce((acc, v) => {
      acc[v.platform] = (acc[v.platform] || 0) + 1
      return acc
    }, {} as { [key: string]: number })
    
    const topNicho = Object.keys(nichoCounts).reduce((a, b) => 
      nichoCounts[a] > nichoCounts[b] ? a : b, 'fitness'
    )
    
    const topPlatform = Object.keys(platformCounts).reduce((a, b) => 
      platformCounts[a] > platformCounts[b] ? a : b, 'instagram'
    )
    
    return {
      totalVideos,
      totalTrends,
      averageViralScore,
      topNicho,
      topPlatform
    }
  }
}

