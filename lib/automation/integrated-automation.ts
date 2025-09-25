import { BrowserAutomation } from './browser-automation'
import { EmailGenerator, ClipAccountWithEmail } from './email-generator'
import { ProfileGenerator, MainAccountProfile, GeneratedClipAccount } from '../ai/profile-generator'
import { HumanSimulation } from './human-simulation'

export interface AutomationConfig {
  parentAccount: {
    username: string
    password: string
    platform: 'instagram' | 'tiktok' | 'youtube'
    email: string
  }
  clipAccounts: {
    count: number
    platforms: ('instagram' | 'tiktok' | 'youtube')[]
  }
  automation: {
    createEmails: boolean
    createAccounts: boolean
    postClips: boolean
    humanSimulation: boolean
  }
}

export interface AutomationResult {
  success: boolean
  parentAccountConnected: boolean
  emailsCreated: number
  accountsCreated: number
  clipsPosted: number
  errors: string[]
}

export class IntegratedAutomation {
  private browserAutomation: BrowserAutomation
  private profileGenerator: ProfileGenerator
  private results: AutomationResult

  constructor() {
    this.browserAutomation = new BrowserAutomation()
    this.profileGenerator = new ProfileGenerator()
    this.results = {
      success: false,
      parentAccountConnected: false,
      emailsCreated: 0,
      accountsCreated: 0,
      clipsPosted: 0,
      errors: []
    }
  }

  // Executar automação completa
  async executeFullAutomation(config: AutomationConfig): Promise<AutomationResult> {
    try {
      console.log('🚀 Iniciando automação completa...')

      // 1. Conectar conta principal
      console.log('📱 Conectando conta principal...')
      const parentConnected = await this.connectParentAccount(config.parentAccount)
      this.results.parentAccountConnected = parentConnected

      if (!parentConnected) {
        this.results.errors.push('Falha ao conectar conta principal')
        return this.results
      }

      // 2. Analisar perfil principal
      console.log('🔍 Analisando perfil principal...')
      const mainProfile = await this.analyzeMainProfile(config.parentAccount)
      
      // 3. Gerar perfis de clipe
      console.log('🤖 Gerando perfis de clipe...')
      const clipProfiles = await this.generateClipProfiles(mainProfile, config.clipAccounts.count)
      
      // 4. Criar emails (se habilitado)
      if (config.automation.createEmails) {
        console.log('📧 Criando contas de email...')
        const emailsCreated = await this.createEmailAccounts(clipProfiles)
        this.results.emailsCreated = emailsCreated
      }

      // 5. Criar contas de clipe (se habilitado)
      if (config.automation.createAccounts) {
        console.log('👤 Criando contas de clipe...')
        const accountsCreated = await this.createClipAccounts(clipProfiles)
        this.results.accountsCreated = accountsCreated
      }

      // 6. Postar clipes (se habilitado)
      if (config.automation.postClips) {
        console.log('📤 Postando clipes...')
        const clipsPosted = await this.postClipsToAccounts(clipProfiles)
        this.results.clipsPosted = clipsPosted
      }

      this.results.success = true
      console.log('✅ Automação concluída com sucesso!')

      return this.results

    } catch (error) {
      console.error('❌ Erro na automação:', error)
      this.results.errors.push(`Erro geral: ${error}`)
      return this.results
    }
  }

  // Conectar conta principal
  private async connectParentAccount(parentAccount: any): Promise<boolean> {
    try {
      await this.browserAutomation.init()
      
      const success = await this.browserAutomation.connectMainAccount({
        platform: parentAccount.platform,
        username: parentAccount.username,
        password: parentAccount.password,
        isMain: true
      })

      return success
    } catch (error) {
      console.error('Erro ao conectar conta principal:', error)
      return false
    }
  }

  // Analisar perfil principal
  private async analyzeMainProfile(parentAccount: any): Promise<MainAccountProfile> {
    return await this.profileGenerator.analyzeMainAccount(
      parentAccount.platform,
      parentAccount.username
    )
  }

  // Gerar perfis de clipe
  private async generateClipProfiles(
    mainProfile: MainAccountProfile, 
    count: number
  ): Promise<GeneratedClipAccount[]> {
    return await this.profileGenerator.generateClipProfiles(mainProfile, count)
  }

  // Criar contas de email
  private async createEmailAccounts(clipProfiles: GeneratedClipAccount[]): Promise<number> {
    let emailsCreated = 0

    for (const profile of clipProfiles) {
      try {
        // Gerar email para o perfil
        const emailAccount = EmailGenerator.generateClipEmail(profile.parentAccount, 0)
        
        // Criar conta de email
        const page = await this.browserAutomation['browser']?.newPage()
        if (page) {
          const success = await EmailGenerator.createEmailAccount(page, emailAccount)
          if (success) {
            emailsCreated++
          }
          await page.close()
        }

        // Pausa entre criações
        await HumanSimulation.randomDelay(30000, 60000) // 30-60 segundos

      } catch (error) {
        console.error(`Erro ao criar email para ${profile.username}:`, error)
      }
    }

    return emailsCreated
  }

  // Criar contas de clipe
  private async createClipAccounts(clipProfiles: GeneratedClipAccount[]): Promise<number> {
    let accountsCreated = 0

    for (const profile of clipProfiles) {
      try {
        const success = await this.browserAutomation.createClipAccount(
          {
            platform: profile.platform,
            username: profile.parentAccount,
            password: '', // Será preenchido pelo usuário
            isMain: true
          },
          profile
        )

        if (success) {
          accountsCreated++
        }

        // Pausa entre criações
        await HumanSimulation.randomDelay(60000, 120000) // 1-2 minutos

      } catch (error) {
        console.error(`Erro ao criar conta ${profile.username}:`, error)
      }
    }

    return accountsCreated
  }

  // Postar clipes nas contas
  private async postClipsToAccounts(clipProfiles: GeneratedClipAccount[]): Promise<number> {
    let clipsPosted = 0

    for (const profile of clipProfiles) {
      try {
        const success = await this.browserAutomation.postClip(profile, {
          videoPath: '/path/to/clip.mp4', // Será fornecido pelo usuário
          caption: 'Clipe incrível! 🎬✨',
          hashtags: ['#viral', '#clips', '#trending', '#fyp']
        })

        if (success) {
          clipsPosted++
        }

        // Pausa entre postagens
        await HumanSimulation.randomDelay(30000, 60000) // 30-60 segundos

      } catch (error) {
        console.error(`Erro ao postar clipe na conta ${profile.username}:`, error)
      }
    }

    return clipsPosted
  }

  // Configurar automação segura
  static createSafeConfig(parentAccount: any): AutomationConfig {
    return {
      parentAccount,
      clipAccounts: {
        count: 10,
        platforms: ['instagram', 'tiktok', 'youtube']
      },
      automation: {
        createEmails: true,
        createAccounts: true,
        postClips: false, // Inicialmente desabilitado para teste
        humanSimulation: true
      }
    }
  }

  // Executar automação em etapas
  async executeStepByStep(config: AutomationConfig): Promise<AutomationResult> {
    console.log('🔄 Executando automação em etapas...')

    // Etapa 1: Conectar conta principal
    console.log('📱 Etapa 1: Conectando conta principal...')
    const parentConnected = await this.connectParentAccount(config.parentAccount)
    
    if (!parentConnected) {
      this.results.errors.push('Falha na Etapa 1: Conectar conta principal')
      return this.results
    }

    // Etapa 2: Criar emails
    if (config.automation.createEmails) {
      console.log('📧 Etapa 2: Criando contas de email...')
      const mainProfile = await this.analyzeMainProfile(config.parentAccount)
      const clipProfiles = await this.generateClipProfiles(mainProfile, config.clipAccounts.count)
      const emailsCreated = await this.createEmailAccounts(clipProfiles)
      this.results.emailsCreated = emailsCreated
    }

    // Etapa 3: Criar contas de clipe
    if (config.automation.createAccounts) {
      console.log('👤 Etapa 3: Criando contas de clipe...')
      // Implementar criação de contas
    }

    // Etapa 4: Postar clipes
    if (config.automation.postClips) {
      console.log('📤 Etapa 4: Postando clipes...')
      // Implementar postagem de clipes
    }

    this.results.success = true
    return this.results
  }

  // Limpar recursos
  async cleanup(): Promise<void> {
    await this.browserAutomation.close()
  }
}

