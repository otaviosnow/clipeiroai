export interface NichoTemplate {
  id: string
  nome: string
  descricao: string
  cor: string
  icone: string
  hashtags: string[]
  estilos: string[]
  configuracoes: {
    duracao: number
    formato: 'vertical' | 'horizontal' | 'quadrado'
    qualidade: 'baixa' | 'media' | 'alta'
    efeitos: string[]
  }
}

export interface ClipTemplate {
  id: string
  nome: string
  nicho: string
  descricao: string
  estilos: string[]
  configuracoes: {
    capcut: {
      enabled: boolean
      captionStyle: string
      fontSize: number
      fontColor: string
      backgroundColor: string
      position: string
    }
    efeitos: {
      zoom: boolean
      transicoes: boolean
      filtros: boolean
      bordas: boolean
    }
  }
}

export class NichoTemplateManager {
  private static instance: NichoTemplateManager
  private templates: NichoTemplate[]
  private clipTemplates: ClipTemplate[]

  constructor() {
    this.templates = this.initializeNichoTypes()
    this.clipTemplates = this.initializeClipTemplates()
  }

  static getInstance(): NichoTemplateManager {
    if (!NichoTemplateManager.instance) {
      NichoTemplateManager.instance = new NichoTemplateManager()
    }
    return NichoTemplateManager.instance
  }

  // Inicializar tipos de nicho
  private initializeNichoTypes(): NichoTemplate[] {
    return [
      {
        id: 'fitness',
        nome: 'Fitness & Saúde',
        descricao: 'Conteúdo sobre exercícios, alimentação saudável e bem-estar',
        cor: '#FF6B6B',
        icone: '💪',
        hashtags: ['#fitness', '#saude', '#exercicio'],
        estilos: ['motivacional', 'tutorial', 'antes-depois'],
        configuracoes: {
          duracao: 30,
          formato: 'vertical',
          qualidade: 'alta',
          efeitos: ['zoom', 'slow-motion', 'text-overlay']
        }
      },
      {
        id: 'comida',
        nome: 'Culinária & Gastronomia',
        descricao: 'Receitas, dicas culinárias e experiências gastronômicas',
        cor: '#FFA726',
        icone: '🍳',
        hashtags: ['#comida', '#receita', '#culinaria'],
        estilos: ['tutorial', 'processo', 'resultado'],
        configuracoes: {
          duracao: 45,
          formato: 'vertical',
          qualidade: 'alta',
          efeitos: ['zoom', 'text-overlay', 'border-effect']
        }
      },
      {
        id: 'tech',
        nome: 'Tecnologia',
        descricao: 'Dicas de tecnologia, reviews e tutoriais',
        cor: '#42A5F5',
        icone: '💻',
        hashtags: ['#tech', '#tecnologia', '#dicas'],
        estilos: ['tutorial', 'review', 'dicas'],
        configuracoes: {
          duracao: 60,
          formato: 'vertical',
          qualidade: 'alta',
          efeitos: ['zoom', 'text-overlay', 'creative-transition']
        }
      },
      {
        id: 'lifestyle',
        nome: 'Lifestyle',
        descricao: 'Dia a dia, rotina e estilo de vida',
        cor: '#AB47BC',
        icone: '✨',
        hashtags: ['#lifestyle', '#rotina', '#vida'],
        estilos: ['rotina', 'dicas', 'inspiracao'],
        configuracoes: {
          duracao: 30,
          formato: 'vertical',
          qualidade: 'media',
          efeitos: ['zoom', 'text-overlay', 'slow-motion']
        }
      },
      {
        id: 'educacao',
        nome: 'Educação',
        descricao: 'Conteúdo educacional e didático',
        cor: '#66BB6A',
        icone: '📚',
        hashtags: ['#educacao', '#aprendizado', '#conhecimento'],
        estilos: ['tutorial', 'explicativo', 'didatico'],
        configuracoes: {
          duracao: 90,
          formato: 'vertical',
          qualidade: 'alta',
          efeitos: ['zoom', 'text-overlay', 'highlight-reel']
        }
      },
      {
        id: 'entretenimento',
        nome: 'Entretenimento',
        descricao: 'Conteúdo de entretenimento e diversão',
        cor: '#EF5350',
        icone: '🎭',
        hashtags: ['#entretenimento', '#diversao', '#humor'],
        estilos: ['humor', 'challenge', 'trending'],
        configuracoes: {
          duracao: 15,
          formato: 'vertical',
          qualidade: 'media',
          efeitos: ['fast-motion', 'creative-transition', 'border-effect']
        }
      }
    ]
  }

  // Inicializar templates de clipe
  private initializeClipTemplates(): ClipTemplate[] {
    return [
      {
        id: 'fitness_motivacional',
        nome: 'Fitness Motivacional',
        nicho: 'fitness',
        descricao: 'Clipe motivacional para fitness com efeitos dinâmicos',
        estilos: ['capcut', 'zoom-focus', 'text-overlay'],
        configuracoes: {
          capcut: {
            enabled: true,
            captionStyle: 'bounce',
            fontSize: 28,
            fontColor: 'white',
            backgroundColor: 'black@0.8',
            position: 'bottom'
          },
          efeitos: {
            zoom: true,
            transicoes: true,
            filtros: false,
            bordas: false
          }
        }
      },
      {
        id: 'comida_tutorial',
        nome: 'Tutorial de Comida',
        nicho: 'comida',
        descricao: 'Tutorial de receita com foco nos ingredientes',
        estilos: ['split-screen', 'text-overlay', 'zoom-focus'],
        configuracoes: {
          capcut: {
            enabled: true,
            captionStyle: 'slide',
            fontSize: 24,
            fontColor: 'white',
            backgroundColor: 'orange@0.7',
            position: 'top'
          },
          efeitos: {
            zoom: true,
            transicoes: true,
            filtros: true,
            bordas: false
          }
        }
      },
      {
        id: 'tech_review',
        nome: 'Review de Tech',
        nicho: 'tech',
        descricao: 'Review de produto com foco em detalhes',
        estilos: ['zoom-focus', 'text-overlay', 'creative-transition'],
        configuracoes: {
          capcut: {
            enabled: true,
            captionStyle: 'typewriter',
            fontSize: 22,
            fontColor: 'white',
            backgroundColor: 'blue@0.8',
            position: 'center'
          },
          efeitos: {
            zoom: true,
            transicoes: true,
            filtros: false,
            bordas: true
          }
        }
      },
      {
        id: 'lifestyle_rotina',
        nome: 'Rotina Lifestyle',
        nicho: 'lifestyle',
        descricao: 'Clipe de rotina com efeitos suaves',
        estilos: ['slow-motion', 'text-overlay', 'border-effect'],
        configuracoes: {
          capcut: {
            enabled: true,
            captionStyle: 'fade',
            fontSize: 26,
            fontColor: 'white',
            backgroundColor: 'purple@0.6',
            position: 'bottom'
          },
          efeitos: {
            zoom: false,
            transicoes: true,
            filtros: true,
            bordas: true
          }
        }
      },
      {
        id: 'educacao_tutorial',
        nome: 'Tutorial Educacional',
        nicho: 'educacao',
        descricao: 'Tutorial educacional com foco na explicação',
        estilos: ['highlight-reel', 'text-overlay', 'zoom-focus'],
        configuracoes: {
          capcut: {
            enabled: true,
            captionStyle: 'slide',
            fontSize: 24,
            fontColor: 'white',
            backgroundColor: 'green@0.8',
            position: 'top'
          },
          efeitos: {
            zoom: true,
            transicoes: true,
            filtros: false,
            bordas: false
          }
        }
      },
      {
        id: 'entretenimento_humor',
        nome: 'Entretenimento Humor',
        nicho: 'entretenimento',
        descricao: 'Clipe de humor com efeitos rápidos',
        estilos: ['fast-motion', 'creative-transition', 'border-effect'],
        configuracoes: {
          capcut: {
            enabled: true,
            captionStyle: 'bounce',
            fontSize: 30,
            fontColor: 'white',
            backgroundColor: 'red@0.7',
            position: 'center'
          },
          efeitos: {
            zoom: false,
            transicoes: true,
            filtros: true,
            bordas: true
          }
        }
      }
    ]
  }

  // Obter todos os nichos
  getAllNichos(): NichoTemplate[] {
    return [...this.templates]
  }

  // Obter nicho por ID
  getNichoById(id: string): NichoTemplate | undefined {
    return this.templates.find(template => template.id === id)
  }

  // Obter templates de clipe por nicho
  getClipTemplatesByNicho(nichoId: string): ClipTemplate[] {
    return this.clipTemplates.filter(template => template.nicho === nichoId)
  }

  // Obter template de clipe por ID
  getClipTemplateById(id: string): ClipTemplate | undefined {
    return this.clipTemplates.find(template => template.id === id)
  }

  // Obter hashtags por nicho
  getHashtagsByNicho(nichoId: string): string[] {
    const nicho = this.getNichoById(nichoId)
    return nicho?.hashtags || []
  }

  // Obter configurações por nicho
  getConfiguracoesByNicho(nichoId: string): NichoTemplate['configuracoes'] | undefined {
    const nicho = this.getNichoById(nichoId)
    return nicho?.configuracoes
  }

  // Criar template personalizado
  createCustomTemplate(template: Omit<ClipTemplate, 'id'>): ClipTemplate {
    const newTemplate: ClipTemplate = {
      ...template,
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    
    this.clipTemplates.push(newTemplate)
    return newTemplate
  }

  // Atualizar template
  updateTemplate(id: string, updates: Partial<ClipTemplate>): boolean {
    const index = this.clipTemplates.findIndex(template => template.id === id)
    if (index === -1) return false
    
    this.clipTemplates[index] = { ...this.clipTemplates[index], ...updates }
    return true
  }

  // Deletar template
  deleteTemplate(id: string): boolean {
    const index = this.clipTemplates.findIndex(template => template.id === id)
    if (index === -1) return false
    
    this.clipTemplates.splice(index, 1)
    return true
  }

  // Obter estatísticas
  getStats(): {
    totalNichos: number
    totalTemplates: number
    templatesPorNicho: { [key: string]: number }
  } {
    const templatesPorNicho = this.clipTemplates.reduce((acc, template) => {
      acc[template.nicho] = (acc[template.nicho] || 0) + 1
      return acc
    }, {} as { [key: string]: number })

    return {
      totalNichos: this.templates.length,
      totalTemplates: this.clipTemplates.length,
      templatesPorNicho
    }
  }
}

