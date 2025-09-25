export interface SuccessPattern {
  id: string
  tipo: 'horario' | 'hashtag' | 'formato' | 'nicho' | 'plataforma' | 'duracao'
  valor: string
  sucesso: number
  totalUsos: number
  taxaSucesso: number
  ultimaAtualizacao: Date
  confianca: number
}

export interface LearningInsight {
  id: string
  tipo: 'recomendacao' | 'alerta' | 'sugestao' | 'tendencia'
  titulo: string
  descricao: string
  confianca: number
  acao: string
  prioridade: 'baixa' | 'media' | 'alta' | 'critica'
  criadoEm: Date
  expiraEm?: Date
}

export interface UserBehavior {
  id: string
  usuarioId: string
  acao: 'upload' | 'post' | 'agendamento' | 'visualizacao' | 'interacao'
  contexto: {
    plataforma?: string
    nicho?: string
    horario?: string
    duracao?: number
    formato?: string
    hashtags?: string[]
  }
  resultado: {
    sucesso: boolean
    metricas?: {
      visualizacoes: number
      curtidas: number
      comentarios: number
      compartilhamentos: number
      engajamento: number
    }
  }
  timestamp: Date
}

export class LearningAI {
  private static instance: LearningAI
  private successPatterns: SuccessPattern[]
  private insights: LearningInsight[]
  private userBehaviors: UserBehavior[]
  private learningRate: number = 0.1

  constructor() {
    this.successPatterns = []
    this.insights = []
    this.userBehaviors = []
  }

  static getInstance(): LearningAI {
    if (!LearningAI.instance) {
      LearningAI.instance = new LearningAI()
    }
    return LearningAI.instance
  }

  // Adicionar comportamento do usuário
  addUserBehavior(behavior: Omit<UserBehavior, 'id' | 'timestamp'>): UserBehavior {
    const newBehavior: UserBehavior = {
      ...behavior,
      id: `behavior_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    }
    
    this.userBehaviors.push(newBehavior)
    
    // Aprender com o comportamento
    this.learnFromBehavior(newBehavior)
    
    return newBehavior
  }

  // Aprender com comportamento
  private learnFromBehavior(behavior: UserBehavior): void {
    const { contexto, resultado } = behavior
    
    // Aprender sobre horários
    if (contexto.horario) {
      this.updatePattern('horario', contexto.horario, resultado.sucesso)
    }
    
    // Aprender sobre hashtags
    if (contexto.hashtags) {
      contexto.hashtags.forEach(hashtag => {
        this.updatePattern('hashtag', hashtag, resultado.sucesso)
      })
    }
    
    // Aprender sobre formato
    if (contexto.formato) {
      this.updatePattern('formato', contexto.formato, resultado.sucesso)
    }
    
    // Aprender sobre nicho
    if (contexto.nicho) {
      this.updatePattern('nicho', contexto.nicho, resultado.sucesso)
    }
    
    // Aprender sobre plataforma
    if (contexto.plataforma) {
      this.updatePattern('plataforma', contexto.plataforma, resultado.sucesso)
    }
    
    // Aprender sobre duração
    if (contexto.duracao) {
      const duracaoRange = this.getDuracaoRange(contexto.duracao)
      this.updatePattern('duracao', duracaoRange, resultado.sucesso)
    }
  }

  // Atualizar padrão de sucesso
  private updatePattern(tipo: SuccessPattern['tipo'], valor: string, sucesso: boolean): void {
    const existingPattern = this.successPatterns.find(
      p => p.tipo === tipo && p.valor === valor
    )
    
    if (existingPattern) {
      // Atualizar padrão existente
      existingPattern.totalUsos += 1
      if (sucesso) {
        existingPattern.sucesso += 1
      }
      existingPattern.taxaSucesso = existingPattern.sucesso / existingPattern.totalUsos
      existingPattern.ultimaAtualizacao = new Date()
      existingPattern.confianca = Math.min(1, existingPattern.confianca + this.learningRate)
    } else {
      // Criar novo padrão
      const newPattern: SuccessPattern = {
        id: `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        tipo,
        valor,
        sucesso: sucesso ? 1 : 0,
        totalUsos: 1,
        taxaSucesso: sucesso ? 1 : 0,
        ultimaAtualizacao: new Date(),
        confianca: 0.5
      }
      
      this.successPatterns.push(newPattern)
    }
  }

  // Obter faixa de duração
  private getDuracaoRange(duracao: number): string {
    if (duracao <= 15) return '0-15s'
    if (duracao <= 30) return '16-30s'
    if (duracao <= 60) return '31-60s'
    return '60s+'
  }

  // Gerar insights baseados nos padrões
  generateInsights(): LearningInsight[] {
    const insights: LearningInsight[] = []
    
    // Analisar padrões de sucesso
    const topPatterns = this.successPatterns
      .filter(p => p.totalUsos >= 3) // Mínimo de 3 usos
      .sort((a, b) => b.taxaSucesso - a.taxaSucesso)
      .slice(0, 10)
    
    // Gerar insights de recomendação
    topPatterns.forEach(pattern => {
      if (pattern.taxaSucesso > 0.7 && pattern.confianca > 0.6) {
        insights.push({
          id: `insight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          tipo: 'recomendacao',
          titulo: `Continue usando ${pattern.valor}`,
          descricao: `Seu ${pattern.tipo} "${pattern.valor}" tem ${(pattern.taxaSucesso * 100).toFixed(1)}% de taxa de sucesso. Continue usando!`,
          confianca: pattern.confianca,
          acao: `Manter ${pattern.tipo}: ${pattern.valor}`,
          prioridade: 'media',
          criadoEm: new Date()
        })
      }
    })
    
    // Analisar padrões de baixo desempenho
    const lowPatterns = this.successPatterns
      .filter(p => p.totalUsos >= 3 && p.taxaSucesso < 0.3)
      .sort((a, b) => a.taxaSucesso - b.taxaSucesso)
    
    lowPatterns.forEach(pattern => {
      insights.push({
        id: `insight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        tipo: 'alerta',
        titulo: `Evite ${pattern.valor}`,
        descricao: `Seu ${pattern.tipo} "${pattern.valor}" tem apenas ${(pattern.taxaSucesso * 100).toFixed(1)}% de taxa de sucesso. Considere mudar.`,
        confianca: pattern.confianca,
        acao: `Evitar ${pattern.tipo}: ${pattern.valor}`,
        prioridade: 'alta',
        criadoEm: new Date()
      })
    })
    
    // Gerar insights de tendência
    this.generateTrendInsights(insights)
    
    // Gerar insights de otimização
    this.generateOptimizationInsights(insights)
    
    return insights
  }

  // Gerar insights de tendência
  private generateTrendInsights(insights: LearningInsight[]): void {
    // Analisar horários de maior sucesso
    const horarios = this.successPatterns.filter(p => p.tipo === 'horario')
    if (horarios.length > 0) {
      const melhorHorario = horarios.reduce((a, b) => a.taxaSucesso > b.taxaSucesso ? a : b)
      
      insights.push({
        id: `insight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        tipo: 'tendencia',
        titulo: 'Melhor horário para postar',
        descricao: `Seus posts às ${melhorHorario.valor} têm ${(melhorHorario.taxaSucesso * 100).toFixed(1)}% de taxa de sucesso.`,
        confianca: melhorHorario.confianca,
        acao: `Postar sempre às ${melhorHorario.valor}`,
        prioridade: 'alta',
        criadoEm: new Date()
      })
    }
    
    // Analisar hashtags de maior sucesso
    const hashtags = this.successPatterns.filter(p => p.tipo === 'hashtag')
    if (hashtags.length > 0) {
      const topHashtags = hashtags
        .sort((a, b) => b.taxaSucesso - a.taxaSucesso)
        .slice(0, 3)
      
      insights.push({
        id: `insight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        tipo: 'tendencia',
        titulo: 'Hashtags mais eficazes',
        descricao: `Suas hashtags mais eficazes são: ${topHashtags.map(h => h.valor).join(', ')}.`,
        confianca: topHashtags[0].confianca,
        acao: 'Usar essas hashtags regularmente',
        prioridade: 'media',
        criadoEm: new Date()
      })
    }
  }

  // Gerar insights de otimização
  private generateOptimizationInsights(insights: LearningInsight[]): void {
    // Analisar duração ideal
    const duracoes = this.successPatterns.filter(p => p.tipo === 'duracao')
    if (duracoes.length > 0) {
      const melhorDuracao = duracoes.reduce((a, b) => a.taxaSucesso > b.taxaSucesso ? a : b)
      
      insights.push({
        id: `insight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        tipo: 'sugestao',
        titulo: 'Duração ideal de vídeo',
        descricao: `Vídeos de ${melhorDuracao.valor} têm ${(melhorDuracao.taxaSucesso * 100).toFixed(1)}% de taxa de sucesso.`,
        confianca: melhorDuracao.confianca,
        acao: `Focar em vídeos de ${melhorDuracao.valor}`,
        prioridade: 'media',
        criadoEm: new Date()
      })
    }
    
    // Analisar plataforma ideal
    const plataformas = this.successPatterns.filter(p => p.tipo === 'plataforma')
    if (plataformas.length > 0) {
      const melhorPlataforma = plataformas.reduce((a, b) => a.taxaSucesso > b.taxaSucesso ? a : b)
      
      insights.push({
        id: `insight_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        tipo: 'sugestao',
        titulo: 'Plataforma mais eficaz',
        descricao: `Seus posts no ${melhorPlataforma.valor} têm ${(melhorPlataforma.taxaSucesso * 100).toFixed(1)}% de taxa de sucesso.`,
        confianca: melhorPlataforma.confianca,
        acao: `Focar mais no ${melhorPlataforma.valor}`,
        prioridade: 'alta',
        criadoEm: new Date()
      })
    }
  }

  // Obter recomendações personalizadas
  getPersonalizedRecommendations(usuarioId: string): {
    horarioIdeal: string
    hashtagsRecomendadas: string[]
    duracaoIdeal: string
    plataformaIdeal: string
    nichoIdeal: string
  } {
    const userBehaviors = this.userBehaviors.filter(b => b.usuarioId === usuarioId)
    
    // Analisar padrões do usuário
    const horarios = this.successPatterns.filter(p => p.tipo === 'horario')
    const hashtags = this.successPatterns.filter(p => p.tipo === 'hashtag')
    const duracoes = this.successPatterns.filter(p => p.tipo === 'duracao')
    const plataformas = this.successPatterns.filter(p => p.tipo === 'plataforma')
    const nichos = this.successPatterns.filter(p => p.tipo === 'nicho')
    
    return {
      horarioIdeal: horarios.length > 0 ? horarios.reduce((a, b) => a.taxaSucesso > b.taxaSucesso ? a : b).valor : '18:00',
      hashtagsRecomendadas: hashtags
        .sort((a, b) => b.taxaSucesso - a.taxaSucesso)
        .slice(0, 5)
        .map(h => h.valor),
      duracaoIdeal: duracoes.length > 0 ? duracoes.reduce((a, b) => a.taxaSucesso > b.taxaSucesso ? a : b).valor : '30s',
      plataformaIdeal: plataformas.length > 0 ? plataformas.reduce((a, b) => a.taxaSucesso > b.taxaSucesso ? a : b).valor : 'instagram',
      nichoIdeal: nichos.length > 0 ? nichos.reduce((a, b) => a.taxaSucesso > b.taxaSucesso ? a : b).valor : 'lifestyle'
    }
  }

  // Obter estatísticas de aprendizado
  getLearningStats(): {
    totalPatterns: number
    totalBehaviors: number
    averageConfidence: number
    topSuccessPatterns: SuccessPattern[]
    recentInsights: LearningInsight[]
  } {
    const topSuccessPatterns = this.successPatterns
      .filter(p => p.totalUsos >= 3)
      .sort((a, b) => b.taxaSucesso - a.taxaSucesso)
      .slice(0, 5)
    
    const recentInsights = this.insights
      .sort((a, b) => b.criadoEm.getTime() - a.criadoEm.getTime())
      .slice(0, 5)
    
    const averageConfidence = this.successPatterns.length > 0 
      ? this.successPatterns.reduce((acc, p) => acc + p.confianca, 0) / this.successPatterns.length
      : 0
    
    return {
      totalPatterns: this.successPatterns.length,
      totalBehaviors: this.userBehaviors.length,
      averageConfidence,
      topSuccessPatterns,
      recentInsights
    }
  }

  // Simular dados de aprendizado
  static generateMockLearningData(): void {
    const learningAI = LearningAI.getInstance()
    
    // Simular comportamentos de usuário
    const comportamentos = [
      { acao: 'post' as const, contexto: { horario: '18:00', plataforma: 'instagram', nicho: 'fitness' }, resultado: { sucesso: true, metricas: { visualizacoes: 5000, curtidas: 500, comentarios: 50, compartilhamentos: 25, engajamento: 575 } } },
      { acao: 'post' as const, contexto: { horario: '20:00', plataforma: 'tiktok', nicho: 'fitness' }, resultado: { sucesso: true, metricas: { visualizacoes: 8000, curtidas: 800, comentarios: 80, compartilhamentos: 40, engajamento: 920 } } },
      { acao: 'post' as const, contexto: { horario: '14:00', plataforma: 'instagram', nicho: 'fitness' }, resultado: { sucesso: false, metricas: { visualizacoes: 1000, curtidas: 50, comentarios: 5, compartilhamentos: 2, engajamento: 57 } } },
      { acao: 'post' as const, contexto: { horario: '19:00', plataforma: 'youtube', nicho: 'tech' }, resultado: { sucesso: true, metricas: { visualizacoes: 12000, curtidas: 1200, comentarios: 120, compartilhamentos: 60, engajamento: 1380 } } },
      { acao: 'post' as const, contexto: { horario: '21:00', plataforma: 'instagram', nicho: 'lifestyle' }, resultado: { sucesso: true, metricas: { visualizacoes: 6000, curtidas: 600, comentarios: 60, compartilhamentos: 30, engajamento: 690 } } }
    ]
    
    comportamentos.forEach(comportamento => {
      learningAI.addUserBehavior({
        usuarioId: 'user_1',
        ...comportamento
      })
    })
  }
}

