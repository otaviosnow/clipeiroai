import { BrowserAutomation } from './browser-automation'
import { EmailGenerator, ClipAccountWithEmail } from './email-generator'
import { ProfileGenerator, MainAccountProfile, GeneratedClipAccount } from '../ai/profile-generator'
import { HumanSimulation } from './human-simulation'

export interface TestModeConfig {
  parentAccount: {
    username: string
    displayName: string
    bio: string
    profilePicture: string
    link?: string
    platform: 'instagram' | 'tiktok' | 'youtube'
  }
  clipAccounts: {
    count: number
    platforms: ('instagram' | 'tiktok' | 'youtube')[]
  }
  testMode: {
    skipLogin: boolean
    mockData: boolean
    simulateCreation: boolean
    humanSimulation: boolean
  }
}

export interface TestModeResult {
  success: boolean
  parentAccountAnalyzed: boolean
  emailsGenerated: number
  profilesGenerated: number
  clipsSimulated: number
  errors: string[]
  mockData: {
    parentAccount: MainAccountProfile
    clipProfiles: GeneratedClipAccount[]
    emailAccounts: any[]
  }
}

export class TestModeAutomation {
  private profileGenerator: ProfileGenerator
  private results: TestModeResult

  constructor() {
    this.profileGenerator = new ProfileGenerator()
    this.results = {
      success: false,
      parentAccountAnalyzed: false,
      emailsGenerated: 0,
      profilesGenerated: 0,
      clipsSimulated: 0,
      errors: [],
      mockData: {
        parentAccount: {} as MainAccountProfile,
        clipProfiles: [],
        emailAccounts: []
      }
    }
  }

  // Executar automação em modo de teste
  async executeTestMode(config: TestModeConfig): Promise<TestModeResult> {
    try {
      console.log('🧪 Iniciando modo de teste...')

      // 1. Analisar perfil principal (sem login)
      console.log('🔍 Analisando perfil principal (modo teste)...')
      const parentAccount = await this.analyzeParentAccount(config.parentAccount)
      this.results.parentAccountAnalyzed = true
      this.results.mockData.parentAccount = parentAccount

      // 2. Gerar perfis de clipe
      console.log('🤖 Gerando perfis de clipe...')
      const clipProfiles = await this.generateClipProfiles(parentAccount, config.clipAccounts.count)
      this.results.profilesGenerated = clipProfiles.length
      this.results.mockData.clipProfiles = clipProfiles

      // 3. Gerar emails (simulado)
      if (config.testMode.mockData) {
        console.log('📧 Gerando emails (modo teste)...')
        const emailAccounts = await this.generateEmailAccounts(config.parentAccount.username, config.clipAccounts.count)
        this.results.emailsGenerated = emailAccounts.length
        this.results.mockData.emailAccounts = emailAccounts
      }

      // 4. Simular criação de contas
      if (config.testMode.simulateCreation) {
        console.log('👤 Simulando criação de contas...')
        const accountsCreated = await this.simulateAccountCreation(clipProfiles)
        console.log(`✅ ${accountsCreated} contas simuladas`)
      }

      // 5. Simular postagem de clipes
      if (config.testMode.simulateCreation) {
        console.log('📤 Simulando postagem de clipes...')
        const clipsPosted = await this.simulateClipPosting(clipProfiles)
        this.results.clipsSimulated = clipsPosted
        console.log(`✅ ${clipsPosted} clipes simulados`)
      }

      this.results.success = true
      console.log('✅ Modo de teste concluído com sucesso!')

      return this.results

    } catch (error) {
      console.error('❌ Erro no modo de teste:', error)
      this.results.errors.push(`Erro geral: ${error}`)
      return this.results
    }
  }

  // Analisar perfil principal (sem login)
  private async analyzeParentAccount(parentAccount: any): Promise<MainAccountProfile> {
    // Simular análise do perfil sem fazer login
    await HumanSimulation.randomDelay(1000, 2000) // Simular tempo de análise

    return {
      username: parentAccount.username,
      displayName: parentAccount.displayName,
      bio: parentAccount.bio,
      profilePicture: parentAccount.profilePicture,
      link: parentAccount.link,
      platform: parentAccount.platform
    }
  }

  // Gerar perfis de clipe
  private async generateClipProfiles(
    parentAccount: MainAccountProfile, 
    count: number
  ): Promise<GeneratedClipAccount[]> {
    return await this.profileGenerator.generateClipProfiles(parentAccount, count)
  }

  // Gerar contas de email (simulado)
  private async generateEmailAccounts(parentUsername: string, count: number): Promise<any[]> {
    const emailAccounts = []

    for (let i = 0; i < count; i++) {
      const emailAccount = EmailGenerator.generateClipEmail(parentUsername, i)
      emailAccounts.push(emailAccount)
      
      // Simular tempo de criação
      await HumanSimulation.randomDelay(500, 1000)
    }

    return emailAccounts
  }

  // Simular criação de contas
  private async simulateAccountCreation(clipProfiles: GeneratedClipAccount[]): Promise<number> {
    let accountsCreated = 0

    for (const profile of clipProfiles) {
      try {
        // Simular criação de conta
        await HumanSimulation.randomDelay(2000, 5000) // Simular tempo de criação
        
        // Simular comportamento humano
        await HumanSimulation.simulateHumanBehavior(null as any)
        
        accountsCreated++
        console.log(`✅ Conta criada: ${profile.username}`)

        // Pausa entre criações
        await HumanSimulation.randomDelay(10000, 20000) // 10-20 segundos

      } catch (error) {
        console.error(`❌ Erro ao simular criação da conta ${profile.username}:`, error)
      }
    }

    return accountsCreated
  }

  // Simular postagem de clipes
  private async simulateClipPosting(clipProfiles: GeneratedClipAccount[]): Promise<number> {
    let clipsPosted = 0

    for (const profile of clipProfiles) {
      try {
        // Simular postagem de clipe
        await HumanSimulation.randomDelay(3000, 8000) // Simular tempo de postagem
        
        // Simular comportamento humano
        await HumanSimulation.simulateHumanBehavior(null as any)
        
        clipsPosted++
        console.log(`✅ Clipe postado na conta: ${profile.username}`)

        // Pausa entre postagens
        await HumanSimulation.randomDelay(5000, 15000) // 5-15 segundos

      } catch (error) {
        console.error(`❌ Erro ao simular postagem na conta ${profile.username}:`, error)
      }
    }

    return clipsPosted
  }

  // Gerar dados de teste
  static generateTestData(): TestModeConfig {
    return {
      parentAccount: {
        username: 'minhaconta_teste',
        displayName: 'Minha Conta Teste',
        bio: 'Criador de conteúdo incrível! 🎬✨\n📱 Siga para mais conteúdo\n🔥 Clipes que viralizam!',
        profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teste',
        link: 'https://linktr.ee/minhaconta',
        platform: 'instagram'
      },
      clipAccounts: {
        count: 5,
        platforms: ['instagram', 'tiktok', 'youtube']
      },
      testMode: {
        skipLogin: true,
        mockData: true,
        simulateCreation: true,
        humanSimulation: true
      }
    }
  }

  // Validar configuração de teste
  static validateTestConfig(config: TestModeConfig): string[] {
    const errors: string[] = []

    if (!config.parentAccount.username) {
      errors.push('Username da conta principal é obrigatório')
    }

    if (!config.parentAccount.displayName) {
      errors.push('Nome de exibição da conta principal é obrigatório')
    }

    if (!config.parentAccount.bio) {
      errors.push('Biografia da conta principal é obrigatória')
    }

    if (config.clipAccounts.count < 1 || config.clipAccounts.count > 20) {
      errors.push('Número de contas de clipe deve estar entre 1 e 20')
    }

    if (config.clipAccounts.platforms.length === 0) {
      errors.push('Pelo menos uma plataforma deve ser selecionada')
    }

    return errors
  }

  // Gerar relatório de teste
  generateTestReport(): string {
    const report = `
# 🧪 Relatório de Teste - Clipeiro

## 📊 Resultados:
- **Sucesso**: ${this.results.success ? '✅' : '❌'}
- **Conta Principal Analisada**: ${this.results.parentAccountAnalyzed ? '✅' : '❌'}
- **Emails Gerados**: ${this.results.emailsGenerated}
- **Perfis Gerados**: ${this.results.profilesGenerated}
- **Clipes Simulados**: ${this.results.clipsSimulated}

## 📋 Dados Gerados:

### Conta Principal:
- **Username**: ${this.results.mockData.parentAccount.username}
- **Display Name**: ${this.results.mockData.parentAccount.displayName}
- **Bio**: ${this.results.mockData.parentAccount.bio}
- **Platform**: ${this.results.mockData.parentAccount.platform}

### Perfis de Clipe:
${this.results.mockData.clipProfiles.map((profile, index) => `
${index + 1}. **${profile.username}**
   - Display: ${profile.displayName}
   - Platform: ${profile.platform}
   - Bio: ${profile.bio.substring(0, 50)}...
`).join('')}

### Emails Gerados:
${this.results.mockData.emailAccounts.map((email, index) => `
${index + 1}. **${email.email}**
   - Provider: ${email.provider}
   - Password: ${email.password}
`).join('')}

## ⚠️ Erros:
${this.results.errors.length > 0 ? this.results.errors.map(error => `- ${error}`).join('\n') : 'Nenhum erro encontrado'}

## 🎯 Conclusão:
${this.results.success ? 'Teste executado com sucesso! Todos os componentes funcionaram corretamente.' : 'Teste falhou. Verifique os erros acima.'}
    `

    return report
  }
}

