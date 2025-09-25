import puppeteer, { Browser, Page } from 'puppeteer'
import { promises as fs } from 'fs'
import path from 'path'

export interface SocialAccount {
  platform: 'instagram' | 'tiktok' | 'youtube'
  username: string
  password: string
  isMain: boolean
  sessionData?: any
}

export interface ClipAccount {
  platform: 'instagram' | 'tiktok' | 'youtube'
  username: string
  displayName: string
  bio: string
  profilePicture: string
  isActive: boolean
  parentAccount: string
}

export class BrowserAutomation {
  private browser: Browser | null = null
  private sessions: Map<string, any> = new Map()

  async init() {
    this.browser = await puppeteer.launch({
      headless: false, // Para debug, pode ser true em produção
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    })
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
    }
  }

  // Conectar conta principal
  async connectMainAccount(account: SocialAccount): Promise<boolean> {
    if (!this.browser) throw new Error('Browser não inicializado')

    const page = await this.browser.newPage()
    
    try {
      // Configurar user agent e viewport
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36')
      await page.setViewport({ width: 1366, height: 768 })

      let success = false

      switch (account.platform) {
        case 'instagram':
          success = await this.connectInstagram(page, account)
          break
        case 'tiktok':
          success = await this.connectTikTok(page, account)
          break
        case 'youtube':
          success = await this.connectYouTube(page, account)
          break
      }

      if (success) {
        // Salvar dados da sessão
        const cookies = await page.cookies()
        const localStorage = await page.evaluate(() => JSON.stringify(localStorage))
        const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage))
        
        this.sessions.set(account.username, {
          cookies,
          localStorage,
          sessionStorage,
          platform: account.platform
        })

        // Salvar sessão em arquivo
        await this.saveSession(account.username, {
          cookies,
          localStorage,
          sessionStorage,
          platform: account.platform
        })
      }

      return success
    } finally {
      await page.close()
    }
  }

  // Conectar Instagram
  private async connectInstagram(page: Page, account: SocialAccount): Promise<boolean> {
    try {
      await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' })
      
      // Aguardar campos de login
      await page.waitForSelector('input[name="username"]', { timeout: 10000 })
      
      // Preencher credenciais
      await page.type('input[name="username"]', account.username)
      await page.type('input[name="password"]', account.password)
      
      // Clicar em login
      await page.click('button[type="submit"]')
      
      // Aguardar redirecionamento
      await page.waitForNavigation({ waitUntil: 'networkidle2' })
      
      // Verificar se login foi bem-sucedido
      const currentUrl = page.url()
      if (currentUrl.includes('/accounts/login/')) {
        throw new Error('Falha no login do Instagram')
      }
      
      return true
    } catch (error) {
      console.error('Erro ao conectar Instagram:', error)
      return false
    }
  }

  // Conectar TikTok
  private async connectTikTok(page: Page, account: SocialAccount): Promise<boolean> {
    try {
      await page.goto('https://www.tiktok.com/login', { waitUntil: 'networkidle2' })
      
      // Aguardar campos de login
      await page.waitForSelector('input[placeholder*="username"]', { timeout: 10000 })
      
      // Preencher credenciais
      await page.type('input[placeholder*="username"]', account.username)
      await page.type('input[placeholder*="password"]', account.password)
      
      // Clicar em login
      await page.click('button[data-e2e="login-button"]')
      
      // Aguardar redirecionamento
      await page.waitForNavigation({ waitUntil: 'networkidle2' })
      
      return true
    } catch (error) {
      console.error('Erro ao conectar TikTok:', error)
      return false
    }
  }

  // Conectar YouTube
  private async connectYouTube(page: Page, account: SocialAccount): Promise<boolean> {
    try {
      await page.goto('https://accounts.google.com/signin', { waitUntil: 'networkidle2' })
      
      // Preencher email
      await page.type('input[type="email"]', account.username)
      await page.click('#identifierNext')
      
      // Aguardar campo de senha
      await page.waitForSelector('input[type="password"]', { timeout: 10000 })
      await page.type('input[type="password"]', account.password)
      await page.click('#passwordNext')
      
      // Aguardar redirecionamento
      await page.waitForNavigation({ waitUntil: 'networkidle2' })
      
      return true
    } catch (error) {
      console.error('Erro ao conectar YouTube:', error)
      return false
    }
  }

  // Criar conta de clipe baseada na principal
  async createClipAccount(parentAccount: SocialAccount, clipAccount: ClipAccount): Promise<boolean> {
    if (!this.browser) throw new Error('Browser não inicializado')

    const page = await this.browser.newPage()
    
    try {
      // Restaurar sessão da conta principal
      const session = this.sessions.get(parentAccount.username)
      if (session) {
        await this.restoreSession(page, session)
      }

      let success = false

      switch (clipAccount.platform) {
        case 'instagram':
          success = await this.createInstagramClipAccount(page, clipAccount)
          break
        case 'tiktok':
          success = await this.createTikTokClipAccount(page, clipAccount)
          break
        case 'youtube':
          success = await this.createYouTubeClipAccount(page, clipAccount)
          break
      }

      return success
    } finally {
      await page.close()
    }
  }

  // Criar conta de clipe no Instagram
  private async createInstagramClipAccount(page: Page, clipAccount: ClipAccount): Promise<boolean> {
    try {
      // Ir para página de registro
      await page.goto('https://www.instagram.com/accounts/emailsignup/', { waitUntil: 'networkidle2' })
      
      // Preencher dados
      await page.type('input[name="emailOrPhone"]', `${clipAccount.username}@clipeiro.com`)
      await page.type('input[name="fullName"]', clipAccount.displayName)
      await page.type('input[name="username"]', clipAccount.username)
      await page.type('input[name="password"]', 'Clipeiro123!')
      
      // Clicar em registrar
      await page.click('button[type="submit"]')
      
      // Aguardar confirmação
      await page.waitForSelector('input[placeholder*="confirmation"]', { timeout: 10000 })
      
      // Simular confirmação (em produção, usar email real)
      await page.type('input[placeholder*="confirmation"]', '123456')
      
      return true
    } catch (error) {
      console.error('Erro ao criar conta de clipe no Instagram:', error)
      return false
    }
  }

  // Criar conta de clipe no TikTok
  private async createTikTokClipAccount(page: Page, clipAccount: ClipAccount): Promise<boolean> {
    try {
      // Ir para página de registro
      await page.goto('https://www.tiktok.com/signup', { waitUntil: 'networkidle2' })
      
      // Preencher dados
      await page.type('input[placeholder*="email"]', `${clipAccount.username}@clipeiro.com`)
      await page.type('input[placeholder*="password"]', 'Clipeiro123!')
      
      // Clicar em registrar
      await page.click('button[data-e2e="signup-button"]')
      
      return true
    } catch (error) {
      console.error('Erro ao criar conta de clipe no TikTok:', error)
      return false
    }
  }

  // Criar conta de clipe no YouTube
  private async createYouTubeClipAccount(page: Page, clipAccount: ClipAccount): Promise<boolean> {
    try {
      // Ir para página de registro
      await page.goto('https://accounts.google.com/signup', { waitUntil: 'networkidle2' })
      
      // Preencher dados
      await page.type('input[name="firstName"]', clipAccount.displayName.split(' ')[0])
      await page.type('input[name="lastName"]', clipAccount.displayName.split(' ')[1] || '')
      await page.type('input[name="Username"]', clipAccount.username)
      await page.type('input[name="Passwd"]', 'Clipeiro123!')
      await page.type('input[name="ConfirmPasswd"]', 'Clipeiro123!')
      
      // Clicar em próximo
      await page.click('#accountDetailsNext')
      
      return true
    } catch (error) {
      console.error('Erro ao criar conta de clipe no YouTube:', error)
      return false
    }
  }

  // Postar clipe automaticamente
  async postClip(clipAccount: ClipAccount, clipData: {
    videoPath: string
    caption: string
    hashtags: string[]
  }): Promise<boolean> {
    if (!this.browser) throw new Error('Browser não inicializado')

    const page = await this.browser.newPage()
    
    try {
      // Restaurar sessão da conta de clipe
      const session = this.sessions.get(clipAccount.username)
      if (session) {
        await this.restoreSession(page, session)
      }

      let success = false

      switch (clipAccount.platform) {
        case 'instagram':
          success = await this.postInstagramClip(page, clipData)
          break
        case 'tiktok':
          success = await this.postTikTokClip(page, clipData)
          break
        case 'youtube':
          success = await this.postYouTubeClip(page, clipData)
          break
      }

      return success
    } finally {
      await page.close()
    }
  }

  // Postar clipe no Instagram
  private async postInstagramClip(page: Page, clipData: any): Promise<boolean> {
    try {
      // Ir para página de criação
      await page.goto('https://www.instagram.com/create/', { waitUntil: 'networkidle2' })
      
      // Aguardar botão de upload
      await page.waitForSelector('input[type="file"]', { timeout: 10000 })
      
      // Upload do vídeo
      const fileInput = await page.$('input[type="file"]')
      if (fileInput) {
        await fileInput.uploadFile(clipData.videoPath)
      }
      
      // Aguardar processamento
      await page.waitForSelector('textarea[placeholder*="Write a caption"]', { timeout: 30000 })
      
      // Preencher legenda
      const caption = `${clipData.caption}\n\n${clipData.hashtags.join(' ')}`
      await page.type('textarea[placeholder*="Write a caption"]', caption)
      
      // Publicar
      await page.click('button[type="submit"]')
      
      return true
    } catch (error) {
      console.error('Erro ao postar clipe no Instagram:', error)
      return false
    }
  }

  // Postar clipe no TikTok
  private async postTikTokClip(page: Page, clipData: any): Promise<boolean> {
    try {
      // Ir para página de criação
      await page.goto('https://www.tiktok.com/upload', { waitUntil: 'networkidle2' })
      
      // Upload do vídeo
      await page.waitForSelector('input[type="file"]', { timeout: 10000 })
      const fileInput = await page.$('input[type="file"]')
      if (fileInput) {
        await fileInput.uploadFile(clipData.videoPath)
      }
      
      // Preencher legenda
      const caption = `${clipData.caption}\n\n${clipData.hashtags.join(' ')}`
      await page.type('textarea[placeholder*="What do you want to say"]', caption)
      
      // Publicar
      await page.click('button[data-e2e="publish-button"]')
      
      return true
    } catch (error) {
      console.error('Erro ao postar clipe no TikTok:', error)
      return false
    }
  }

  // Postar clipe no YouTube
  private async postYouTubeClip(page: Page, clipData: any): Promise<boolean> {
    try {
      // Ir para YouTube Studio
      await page.goto('https://studio.youtube.com/', { waitUntil: 'networkidle2' })
      
      // Clicar em criar
      await page.click('button[aria-label*="Create"]')
      await page.click('button[aria-label*="Upload video"]')
      
      // Upload do vídeo
      await page.waitForSelector('input[type="file"]', { timeout: 10000 })
      const fileInput = await page.$('input[type="file"]')
      if (fileInput) {
        await fileInput.uploadFile(clipData.videoPath)
      }
      
      // Preencher título e descrição
      await page.type('input[aria-label*="Title"]', clipData.caption)
      await page.type('textarea[aria-label*="Description"]', `${clipData.caption}\n\n${clipData.hashtags.join(' ')}`)
      
      // Publicar
      await page.click('button[aria-label*="Publish"]')
      
      return true
    } catch (error) {
      console.error('Erro ao postar clipe no YouTube:', error)
      return false
    }
  }

  // Salvar sessão
  private async saveSession(username: string, sessionData: any): Promise<void> {
    const sessionsDir = path.join(process.cwd(), 'sessions')
    await fs.mkdir(sessionsDir, { recursive: true })
    
    const sessionFile = path.join(sessionsDir, `${username}.json`)
    await fs.writeFile(sessionFile, JSON.stringify(sessionData, null, 2))
  }

  // Restaurar sessão
  private async restoreSession(page: Page, sessionData: any): Promise<void> {
    // Restaurar cookies
    if (sessionData.cookies) {
      await page.setCookie(...sessionData.cookies)
    }
    
    // Restaurar localStorage
    if (sessionData.localStorage) {
      await page.evaluate((data) => {
        const parsed = JSON.parse(data)
        for (const [key, value] of Object.entries(parsed)) {
          localStorage.setItem(key, value as string)
        }
      }, sessionData.localStorage)
    }
    
    // Restaurar sessionStorage
    if (sessionData.sessionStorage) {
      await page.evaluate((data) => {
        const parsed = JSON.parse(data)
        for (const [key, value] of Object.entries(parsed)) {
          sessionStorage.setItem(key, value as string)
        }
      }, sessionData.sessionStorage)
    }
  }
}

