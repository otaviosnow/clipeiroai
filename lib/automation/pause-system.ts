export interface PauseReason {
  id: string
  type: 'rate_limit' | 'suspicious_activity' | 'login_failed' | 'account_locked' | 'manual'
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  detectedAt: Date
  resolvedAt?: Date
  autoResolve: boolean
  autoResolveTime?: number // em minutos
}

export interface PauseStatus {
  isPaused: boolean
  reason?: PauseReason
  pausedAt?: Date
  userAcknowledged: boolean
  userAcknowledgedAt?: Date
  canResume: boolean
}

export class PauseSystem {
  private static instance: PauseSystem
  private pauseStatus: PauseStatus
  private pauseReasons: PauseReason[]
  private listeners: ((status: PauseStatus) => void)[]

  constructor() {
    this.pauseStatus = {
      isPaused: false,
      userAcknowledged: false,
      canResume: false
    }
    this.pauseReasons = []
    this.listeners = []
  }

  static getInstance(): PauseSystem {
    if (!PauseSystem.instance) {
      PauseSystem.instance = new PauseSystem()
    }
    return PauseSystem.instance
  }

  // Detectar problema e pausar automaticamente
  detectAndPause(reason: Omit<PauseReason, 'id' | 'detectedAt'>): void {
    const pauseReason: PauseReason = {
      ...reason,
      id: `pause_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      detectedAt: new Date()
    }

    this.pauseReasons.push(pauseReason)
    
    this.pauseStatus = {
      isPaused: true,
      reason: pauseReason,
      pausedAt: new Date(),
      userAcknowledged: false,
      canResume: false
    }

    this.notifyListeners()
    console.log(`🚨 Sistema pausado: ${pauseReason.message}`)
  }

  // Usuário confirma que está ciente do problema
  acknowledgePause(): void {
    if (!this.pauseStatus.isPaused) return

    this.pauseStatus.userAcknowledged = true
    this.pauseStatus.userAcknowledgedAt = new Date()
    
    // Verificar se pode ser resolvido automaticamente
    if (this.pauseStatus.reason?.autoResolve) {
      this.scheduleAutoResume()
    } else {
      this.pauseStatus.canResume = true
    }

    this.notifyListeners()
    console.log('✅ Usuário confirmou conhecimento do problema')
  }

  // Usuário clica para descongelar o sistema
  resumeSystem(): void {
    if (!this.pauseStatus.isPaused || !this.pauseStatus.canResume) return

    this.pauseStatus = {
      isPaused: false,
      userAcknowledged: false,
      canResume: false
    }

    // Marcar motivo como resolvido
    if (this.pauseStatus.reason) {
      this.pauseStatus.reason.resolvedAt = new Date()
    }

    this.notifyListeners()
    console.log('🚀 Sistema retomado pelo usuário')
  }

  // Agendar retomada automática
  private scheduleAutoResume(): void {
    if (!this.pauseStatus.reason?.autoResolveTime) return

    const autoResolveTime = this.pauseStatus.reason.autoResolveTime * 60 * 1000 // converter para ms
    
    setTimeout(() => {
      if (this.pauseStatus.isPaused && this.pauseStatus.userAcknowledged) {
        this.resumeSystem()
        console.log('🔄 Sistema retomado automaticamente')
      }
    }, autoResolveTime)
  }

  // Verificar se sistema está pausado
  isSystemPaused(): boolean {
    return this.pauseStatus.isPaused
  }

  // Obter status atual
  getPauseStatus(): PauseStatus {
    return { ...this.pauseStatus }
  }

  // Obter histórico de pausas
  getPauseHistory(): PauseReason[] {
    return [...this.pauseReasons]
  }

  // Adicionar listener para mudanças de status
  addListener(callback: (status: PauseStatus) => void): void {
    this.listeners.push(callback)
  }

  // Remover listener
  removeListener(callback: (status: PauseStatus) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback)
  }

  // Notificar listeners
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.pauseStatus))
  }

  // Simular detecção de problemas
  static simulateProblemDetection(): void {
    const pauseSystem = PauseSystem.getInstance()
    
    // Simular diferentes tipos de problemas
    const problems = [
      {
        type: 'rate_limit' as const,
        message: 'Muitas requisições detectadas. Sistema pausado para evitar bloqueio.',
        severity: 'high' as const,
        autoResolve: true,
        autoResolveTime: 30 // 30 minutos
      },
      {
        type: 'suspicious_activity' as const,
        message: 'Atividade suspeita detectada. Verificação manual necessária.',
        severity: 'critical' as const,
        autoResolve: false
      },
      {
        type: 'login_failed' as const,
        message: 'Falha no login detectada. Credenciais podem estar incorretas.',
        severity: 'medium' as const,
        autoResolve: true,
        autoResolveTime: 15 // 15 minutos
      },
      {
        type: 'account_locked' as const,
        message: 'Conta bloqueada detectada. Ação imediata necessária.',
        severity: 'critical' as const,
        autoResolve: false
      }
    ]

    const randomProblem = problems[Math.floor(Math.random() * problems.length)]
    pauseSystem.detectAndPause(randomProblem)
  }

  // Verificar se pode executar ação
  canExecuteAction(): boolean {
    return !this.pauseStatus.isPaused
  }

  // Forçar pausa manual
  forcePause(reason: string): void {
    this.detectAndPause({
      type: 'manual',
      message: reason,
      severity: 'medium',
      autoResolve: false
    })
  }

  // Estatísticas do sistema
  getSystemStats(): {
    totalPauses: number
    activePauses: number
    averageResolveTime: number
    mostCommonReason: string
  } {
    const totalPauses = this.pauseReasons.length
    const activePauses = this.pauseReasons.filter(reason => !reason.resolvedAt).length
    
    const resolvedPauses = this.pauseReasons.filter(reason => reason.resolvedAt)
    const averageResolveTime = resolvedPauses.length > 0 
      ? resolvedPauses.reduce((acc, reason) => {
          const resolveTime = reason.resolvedAt!.getTime() - reason.detectedAt.getTime()
          return acc + resolveTime
        }, 0) / resolvedPauses.length / (1000 * 60) // em minutos
      : 0

    const reasonCounts = this.pauseReasons.reduce((acc, reason) => {
      acc[reason.type] = (acc[reason.type] || 0) + 1
      return acc
    }, {} as { [key: string]: number })

    const mostCommonReason = Object.keys(reasonCounts).reduce((a, b) => 
      reasonCounts[a] > reasonCounts[b] ? a : b, 'manual'
    )

    return {
      totalPauses,
      activePauses,
      averageResolveTime,
      mostCommonReason
    }
  }
}

