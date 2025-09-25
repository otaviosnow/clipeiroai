export interface MetricasClip {
  id: string
  nome: string
  plataforma: 'instagram' | 'tiktok' | 'youtube'
  visualizacoes: number
  curtidas: number
  comentarios: number
  compartilhamentos: number
  engajamento: number
  alcance: number
  impressoes: number
  taxaEngajamento: number
  taxaCurtidas: number
  taxaComentarios: number
  taxaCompartilhamentos: number
  dataPostagem: Date
  duracao: number
  nicho: string
  tags: string[]
}

export interface MetricasConta {
  id: string
  username: string
  plataforma: 'instagram' | 'tiktok' | 'youtube'
  seguidores: number
  seguindo: number
  posts: number
  engajamentoTotal: number
  alcanceTotal: number
  impressoesTotal: number
  taxaEngajamentoMedia: number
  crescimentoSeguidores: number
  melhorPost: string
  piorPost: string
  nicho: string
  dataCriacao: Date
  ultimaAtividade: Date
}

export interface RelatorioAnalytics {
  periodo: {
    inicio: Date
    fim: Date
  }
  metricasGerais: {
    totalClips: number
    totalVisualizacoes: number
    totalCurtidas: number
    totalComentarios: number
    totalCompartilhamentos: number
    engajamentoMedio: number
    alcanceMedio: number
    taxaEngajamentoMedia: number
  }
  metricasPorPlataforma: {
    instagram: MetricasClip[]
    tiktok: MetricasClip[]
    youtube: MetricasClip[]
  }
  metricasPorNicho: {
    [nicho: string]: MetricasClip[]
  }
  topPerformers: MetricasClip[]
  pioresPerformers: MetricasClip[]
  tendencias: {
    horariosMelhores: string[]
    diasMelhores: string[]
    tiposConteudoMelhores: string[]
  }
}

export class AnalyticsManager {
  private static instance: AnalyticsManager
  private metricasClips: MetricasClip[]
  private metricasContas: MetricasConta[]

  constructor() {
    this.metricasClips = []
    this.metricasContas = []
  }

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager()
    }
    return AnalyticsManager.instance
  }

  // Adicionar métricas de clipe
  addClipMetrics(metricas: Omit<MetricasClip, 'id'>): MetricasClip {
    const clipMetrics: MetricasClip = {
      ...metricas,
      id: `clip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    
    this.metricasClips.push(clipMetrics)
    return clipMetrics
  }

  // Adicionar métricas de conta
  addAccountMetrics(metricas: Omit<MetricasConta, 'id'>): MetricasConta {
    const accountMetrics: MetricasConta = {
      ...metricas,
      id: `account_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    
    this.metricasContas.push(accountMetrics)
    return accountMetrics
  }

  // Obter métricas de clipe por ID
  getClipMetrics(clipId: string): MetricasClip | undefined {
    return this.metricasClips.find(metricas => metricas.id === clipId)
  }

  // Obter métricas de conta por ID
  getAccountMetrics(accountId: string): MetricasConta | undefined {
    return this.metricasContas.find(metricas => metricas.id === accountId)
  }

  // Obter métricas por plataforma
  getMetricsByPlatform(plataforma: string): MetricasClip[] {
    return this.metricasClips.filter(metricas => metricas.plataforma === plataforma)
  }

  // Obter métricas por nicho
  getMetricsByNicho(nicho: string): MetricasClip[] {
    return this.metricasClips.filter(metricas => metricas.nicho === nicho)
  }

  // Obter métricas por período
  getMetricsByPeriod(inicio: Date, fim: Date): MetricasClip[] {
    return this.metricasClips.filter(metricas => 
      metricas.dataPostagem >= inicio && metricas.dataPostagem <= fim
    )
  }

  // Gerar relatório completo
  generateReport(periodo: { inicio: Date, fim: Date }): RelatorioAnalytics {
    const metricasPeriodo = this.getMetricsByPeriod(periodo.inicio, periodo.fim)
    
    // Métricas gerais
    const metricasGerais = {
      totalClips: metricasPeriodo.length,
      totalVisualizacoes: metricasPeriodo.reduce((acc, m) => acc + m.visualizacoes, 0),
      totalCurtidas: metricasPeriodo.reduce((acc, m) => acc + m.curtidas, 0),
      totalComentarios: metricasPeriodo.reduce((acc, m) => acc + m.comentarios, 0),
      totalCompartilhamentos: metricasPeriodo.reduce((acc, m) => acc + m.compartilhamentos, 0),
      engajamentoMedio: metricasPeriodo.reduce((acc, m) => acc + m.engajamento, 0) / metricasPeriodo.length,
      alcanceMedio: metricasPeriodo.reduce((acc, m) => acc + m.alcance, 0) / metricasPeriodo.length,
      taxaEngajamentoMedia: metricasPeriodo.reduce((acc, m) => acc + m.taxaEngajamento, 0) / metricasPeriodo.length
    }

    // Métricas por plataforma
    const metricasPorPlataforma = {
      instagram: metricasPeriodo.filter(m => m.plataforma === 'instagram'),
      tiktok: metricasPeriodo.filter(m => m.plataforma === 'tiktok'),
      youtube: metricasPeriodo.filter(m => m.plataforma === 'youtube')
    }

    // Métricas por nicho
    const metricasPorNicho = metricasPeriodo.reduce((acc, metricas) => {
      if (!acc[metricas.nicho]) {
        acc[metricas.nicho] = []
      }
      acc[metricas.nicho].push(metricas)
      return acc
    }, {} as { [nicho: string]: MetricasClip[] })

    // Top performers (por engajamento)
    const topPerformers = [...metricasPeriodo]
      .sort((a, b) => b.engajamento - a.engajamento)
      .slice(0, 10)

    // Piores performers
    const pioresPerformers = [...metricasPeriodo]
      .sort((a, b) => a.engajamento - b.engajamento)
      .slice(0, 10)

    // Análise de tendências
    const tendencias = this.analyzeTrends(metricasPeriodo)

    return {
      periodo,
      metricasGerais,
      metricasPorPlataforma,
      metricasPorNicho,
      topPerformers,
      pioresPerformers,
      tendencias
    }
  }

  // Analisar tendências
  private analyzeTrends(metricas: MetricasClip[]): RelatorioAnalytics['tendencias'] {
    // Análise de horários (simulada)
    const horariosMelhores = ['18:00', '19:00', '20:00', '21:00']
    
    // Análise de dias (simulada)
    const diasMelhores = ['Sexta-feira', 'Sábado', 'Domingo']
    
    // Análise de tipos de conteúdo (simulada)
    const tiposConteudoMelhores = ['Tutorial', 'Humor', 'Motivacional', 'Educativo']

    return {
      horariosMelhores,
      diasMelhores,
      tiposConteudoMelhores
    }
  }

  // Obter estatísticas de crescimento
  getGrowthStats(accountId: string, periodo: { inicio: Date, fim: Date }): {
    crescimentoSeguidores: number
    crescimentoEngajamento: number
    crescimentoAlcance: number
    tendencia: 'crescendo' | 'estavel' | 'decaindo'
  } {
    const metricas = this.metricasClips.filter(m => 
      m.dataPostagem >= periodo.inicio && m.dataPostagem <= periodo.fim
    )

    // Simular cálculos de crescimento
    const crescimentoSeguidores = Math.random() * 20 - 10 // -10% a +10%
    const crescimentoEngajamento = Math.random() * 15 - 5 // -5% a +10%
    const crescimentoAlcance = Math.random() * 25 - 10 // -10% a +15%

    let tendencia: 'crescendo' | 'estavel' | 'decaindo' = 'estavel'
    if (crescimentoSeguidores > 5) tendencia = 'crescendo'
    else if (crescimentoSeguidores < -5) tendencia = 'decaindo'

    return {
      crescimentoSeguidores,
      crescimentoEngajamento,
      crescimentoAlcance,
      tendencia
    }
  }

  // Exportar relatório para email
  exportReportToEmail(email: string, relatorio: RelatorioAnalytics): void {
    // Simular envio de email
    console.log(`Enviando relatório para ${email}:`, relatorio)
    
    // Em produção, integrar com serviço de email
    // Ex: SendGrid, Mailgun, etc.
  }

  // Obter insights automáticos
  getInsights(metricas: MetricasClip[]): string[] {
    const insights: string[] = []
    
    // Análise de engajamento
    const engajamentoMedio = metricas.reduce((acc, m) => acc + m.taxaEngajamento, 0) / metricas.length
    
    if (engajamentoMedio > 5) {
      insights.push('Seu conteúdo está gerando alto engajamento! Continue assim.')
    } else if (engajamentoMedio < 2) {
      insights.push('Seu engajamento está baixo. Tente postar em horários diferentes.')
    }

    // Análise de plataforma
    const metricasPorPlataforma = metricas.reduce((acc, m) => {
      acc[m.plataforma] = (acc[m.plataforma] || 0) + 1
      return acc
    }, {} as { [key: string]: number })

    const melhorPlataforma = Object.keys(metricasPorPlataforma).reduce((a, b) => 
      metricasPorPlataforma[a] > metricasPorPlataforma[b] ? a : b
    )

    insights.push(`Sua melhor plataforma é o ${melhorPlataforma}. Foque mais nela.`)

    // Análise de horários
    insights.push('Seus melhores horários para postar são entre 18h e 21h.')

    return insights
  }

  // Simular dados para teste
  static generateMockData(): void {
    const analyticsManager = AnalyticsManager.getInstance()
    
    // Gerar métricas de clipes simuladas
    const nichos = ['fitness', 'comida', 'tech', 'lifestyle', 'educacao', 'entretenimento']
    const plataformas = ['instagram', 'tiktok', 'youtube'] as const
    
    for (let i = 0; i < 50; i++) {
      const nicho = nichos[Math.floor(Math.random() * nichos.length)]
      const plataforma = plataformas[Math.floor(Math.random() * plataformas.length)]
      
      analyticsManager.addClipMetrics({
        nome: `Clip ${i + 1}`,
        plataforma,
        visualizacoes: Math.floor(Math.random() * 10000) + 1000,
        curtidas: Math.floor(Math.random() * 1000) + 100,
        comentarios: Math.floor(Math.random() * 100) + 10,
        compartilhamentos: Math.floor(Math.random() * 50) + 5,
        engajamento: Math.floor(Math.random() * 1000) + 100,
        alcance: Math.floor(Math.random() * 15000) + 2000,
        impressoes: Math.floor(Math.random() * 20000) + 3000,
        taxaEngajamento: Math.random() * 10,
        taxaCurtidas: Math.random() * 15,
        taxaComentarios: Math.random() * 5,
        taxaCompartilhamentos: Math.random() * 3,
        dataPostagem: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        duracao: Math.floor(Math.random() * 60) + 15,
        nicho,
        tags: [`#${nicho}`, '#viral', '#trending']
      })
    }
  }
}

