import { Page } from 'puppeteer'
import { HumanSimulation } from './human-simulation'

export interface EmailAccount {
  email: string
  password: string
  provider: 'gmail' | 'outlook' | 'yahoo' | 'protonmail'
  isActive: boolean
  createdAt: Date
}

export interface ClipAccountWithEmail {
  username: string
  displayName: string
  bio: string
  profilePicture: string
  link?: string
  platform: 'instagram' | 'tiktok' | 'youtube'
  parentAccount: string
  email: EmailAccount
  isActive: boolean
}

export class EmailGenerator {
  private static readonly EMAIL_PROVIDERS = [
    'gmail.com',
    'outlook.com', 
    'hotmail.com',
    'yahoo.com',
    'protonmail.com'
  ]

  private static readonly EMAIL_DOMAINS = [
    'gmail.com',
    'outlook.com',
    'hotmail.com', 
    'yahoo.com',
    'icloud.com',
    'protonmail.com',
    'zoho.com',
    'mail.com'
  ]

  // Gerar email automático para conta de clipe
  static generateClipEmail(parentUsername: string, clipIndex: number): EmailAccount {
    const provider = this.EMAIL_PROVIDERS[clipIndex % this.EMAIL_PROVIDERS.length]
    const emailUsername = this.generateEmailUsername(parentUsername, clipIndex)
    const email = `${emailUsername}@${provider}`
    const password = this.generateSecurePassword()

    return {
      email,
      password,
      provider: provider.split('.')[0] as 'gmail' | 'outlook' | 'yahoo' | 'protonmail',
      isActive: true,
      createdAt: new Date()
    }
  }

  // Gerar username de email
  private static generateEmailUsername(parentUsername: string, clipIndex: number): string {
    const variations = [
      `${parentUsername}_clips`,
      `${parentUsername}_viral`,
      `${parentUsername}_shorts`,
      `${parentUsername}_trending`,
      `${parentUsername}_fyp`,
      `${parentUsername}_reels`,
      `${parentUsername}_content`,
      `${parentUsername}_creator`,
      `${parentUsername}_media`,
      `${parentUsername}_videos`
    ]

    const suffixes = ['_', '', 'x', 'z', 'tv', 'hd', '4k', 'pro', 'max', 'plus']
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    
    const baseVariation = variations[clipIndex % variations.length]
    const suffix = suffixes[clipIndex % suffixes.length]
    const number = numbers[clipIndex % numbers.length]
    
    return `${baseVariation}${suffix}${number}`.toLowerCase()
  }

  // Gerar senha segura
  private static generateSecurePassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let password = ''
    
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    return password
  }

  // Criar conta de email automaticamente
  static async createEmailAccount(
    page: Page, 
    emailAccount: EmailAccount
  ): Promise<boolean> {
    try {
      await HumanSimulation.simulateHumanBehavior(page)

      switch (emailAccount.provider) {
        case 'gmail':
          return await this.createGmailAccount(page, emailAccount)
        case 'outlook':
          return await this.createOutlookAccount(page, emailAccount)
        case 'yahoo':
          return await this.createYahooAccount(page, emailAccount)
        case 'protonmail':
          return await this.createProtonmailAccount(page, emailAccount)
        default:
          return false
      }
    } catch (error) {
      console.error('Erro ao criar conta de email:', error)
      return false
    }
  }

  // Criar conta Gmail
  private static async createGmailAccount(page: Page, emailAccount: EmailAccount): Promise<boolean> {
    try {
      // Ir para página de criação do Gmail
      await page.goto('https://accounts.google.com/signup', { waitUntil: 'networkidle2' })
      await HumanSimulation.simulateHumanBehavior(page)

      // Preencher nome
      await page.type('input[name="firstName"]', 'Clips')
      await HumanSimulation.randomDelay(500, 1000)
      
      await page.type('input[name="lastName"]', 'Viral')
      await HumanSimulation.randomDelay(500, 1000)

      // Preencher username (email)
      await page.type('input[name="Username"]', emailAccount.email.split('@')[0])
      await HumanSimulation.randomDelay(1000, 2000)

      // Preencher senha
      await page.type('input[name="Passwd"]', emailAccount.password)
      await HumanSimulation.randomDelay(500, 1000)
      
      await page.type('input[name="ConfirmPasswd"]', emailAccount.password)
      await HumanSimulation.randomDelay(1000, 2000)

      // Clicar em próximo
      await page.click('#accountDetailsNext')
      await HumanSimulation.randomDelay(2000, 5000)

      // Simular verificação de telefone (pular se possível)
      try {
        await page.waitForSelector('input[type="tel"]', { timeout: 5000 })
        // Simular número de telefone (em produção, usar número real)
        await page.type('input[type="tel"]', '11999999999')
        await HumanSimulation.randomDelay(1000, 2000)
        await page.click('button[type="submit"]')
      } catch (error) {
        // Pular verificação de telefone se não for obrigatória
        console.log('Verificação de telefone não obrigatória')
      }

      // Aguardar criação da conta
      await page.waitForNavigation({ waitUntil: 'networkidle2' })
      
      return true
    } catch (error) {
      console.error('Erro ao criar conta Gmail:', error)
      return false
    }
  }

  // Criar conta Outlook
  private static async createOutlookAccount(page: Page, emailAccount: EmailAccount): Promise<boolean> {
    try {
      // Ir para página de criação do Outlook
      await page.goto('https://signup.live.com/', { waitUntil: 'networkidle2' })
      await HumanSimulation.simulateHumanBehavior(page)

      // Preencher email
      await page.type('input[name="MemberName"]', emailAccount.email.split('@')[0])
      await HumanSimulation.randomDelay(1000, 2000)

      // Preencher senha
      await page.type('input[name="Password"]', emailAccount.password)
      await HumanSimulation.randomDelay(500, 1000)

      // Clicar em próximo
      await page.click('input[type="submit"]')
      await HumanSimulation.randomDelay(2000, 5000)

      // Preencher nome
      await page.type('input[name="FirstName"]', 'Clips')
      await HumanSimulation.randomDelay(500, 1000)
      
      await page.type('input[name="LastName"]', 'Viral')
      await HumanSimulation.randomDelay(1000, 2000)

      // Clicar em próximo
      await page.click('input[type="submit"]')
      await HumanSimulation.randomDelay(2000, 5000)

      // Aguardar criação da conta
      await page.waitForNavigation({ waitUntil: 'networkidle2' })
      
      return true
    } catch (error) {
      console.error('Erro ao criar conta Outlook:', error)
      return false
    }
  }

  // Criar conta Yahoo
  private static async createYahooAccount(page: Page, emailAccount: EmailAccount): Promise<boolean> {
    try {
      // Ir para página de criação do Yahoo
      await page.goto('https://login.yahoo.com/account/create', { waitUntil: 'networkidle2' })
      await HumanSimulation.simulateHumanBehavior(page)

      // Preencher nome
      await page.type('input[name="firstName"]', 'Clips')
      await HumanSimulation.randomDelay(500, 1000)
      
      await page.type('input[name="lastName"]', 'Viral')
      await HumanSimulation.randomDelay(500, 1000)

      // Preencher email
      await page.type('input[name="yid"]', emailAccount.email.split('@')[0])
      await HumanSimulation.randomDelay(1000, 2000)

      // Preencher senha
      await page.type('input[name="password"]', emailAccount.password)
      await HumanSimulation.randomDelay(500, 1000)

      // Clicar em próximo
      await page.click('button[type="submit"]')
      await HumanSimulation.randomDelay(2000, 5000)

      // Aguardar criação da conta
      await page.waitForNavigation({ waitUntil: 'networkidle2' })
      
      return true
    } catch (error) {
      console.error('Erro ao criar conta Yahoo:', error)
      return false
    }
  }

  // Criar conta Protonmail
  private static async createProtonmailAccount(page: Page, emailAccount: EmailAccount): Promise<boolean> {
    try {
      // Ir para página de criação do Protonmail
      await page.goto('https://account.proton.me/signup', { waitUntil: 'networkidle2' })
      await HumanSimulation.simulateHumanBehavior(page)

      // Preencher username
      await page.type('input[name="username"]', emailAccount.email.split('@')[0])
      await HumanSimulation.randomDelay(1000, 2000)

      // Preencher senha
      await page.type('input[name="password"]', emailAccount.password)
      await HumanSimulation.randomDelay(500, 1000)
      
      await page.type('input[name="confirmPassword"]', emailAccount.password)
      await HumanSimulation.randomDelay(1000, 2000)

      // Clicar em criar conta
      await page.click('button[type="submit"]')
      await HumanSimulation.randomDelay(2000, 5000)

      // Aguardar criação da conta
      await page.waitForNavigation({ waitUntil: 'networkidle2' })
      
      return true
    } catch (error) {
      console.error('Erro ao criar conta Protonmail:', error)
      return false
    }
  }

  // Verificar se email já existe
  static async checkEmailAvailability(email: string): Promise<boolean> {
    // Em produção, usar APIs reais para verificar disponibilidade
    // Por enquanto, simular verificação
    return Math.random() > 0.1 // 90% de chance de estar disponível
  }

  // Gerar lista de emails para contas de clipe
  static generateClipEmails(
    parentUsername: string, 
    count: number = 10
  ): EmailAccount[] {
    const emails: EmailAccount[] = []

    for (let i = 0; i < count; i++) {
      const email = this.generateClipEmail(parentUsername, i)
      emails.push(email)
    }

    return emails
  }

  // Criar múltiplas contas de email
  static async createMultipleEmailAccounts(
    page: Page,
    emailAccounts: EmailAccount[]
  ): Promise<boolean[]> {
    const results: boolean[] = []

    for (const emailAccount of emailAccounts) {
      try {
        const success = await this.createEmailAccount(page, emailAccount)
        results.push(success)
        
        // Pausa entre criações para evitar detecção
        await HumanSimulation.randomDelay(30000, 60000) // 30-60 segundos
      } catch (error) {
        console.error(`Erro ao criar email ${emailAccount.email}:`, error)
        results.push(false)
      }
    }

    return results
  }

  // Salvar contas de email criadas
  static async saveEmailAccounts(emailAccounts: EmailAccount[]): Promise<void> {
    const fs = require('fs').promises
    const path = require('path')
    
    const emailsDir = path.join(process.cwd(), 'data', 'emails')
    await fs.mkdir(emailsDir, { recursive: true })
    
    const emailsFile = path.join(emailsDir, 'clip_emails.json')
    await fs.writeFile(emailsFile, JSON.stringify(emailAccounts, null, 2))
  }

  // Carregar contas de email salvas
  static async loadEmailAccounts(): Promise<EmailAccount[]> {
    const fs = require('fs').promises
    const path = require('path')
    
    const emailsFile = path.join(process.cwd(), 'data', 'emails', 'clip_emails.json')
    
    try {
      const data = await fs.readFile(emailsFile, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      return []
    }
  }
}

