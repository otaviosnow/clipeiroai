import { Page } from 'puppeteer'

export class HumanSimulation {
  private static readonly USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15'
  ]

  private static readonly VIEWPORTS = [
    { width: 1920, height: 1080 },
    { width: 1366, height: 768 },
    { width: 1440, height: 900 },
    { width: 1536, height: 864 },
    { width: 1600, height: 900 }
  ]

  // Simular comportamento humano real
  static async simulateHumanBehavior(page: Page): Promise<void> {
    // 1. Configurar user agent aleatório
    const userAgent = this.USER_AGENTS[Math.floor(Math.random() * this.USER_AGENTS.length)]
    await page.setUserAgent(userAgent)

    // 2. Configurar viewport aleatório
    const viewport = this.VIEWPORTS[Math.floor(Math.random() * this.VIEWPORTS.length)]
    await page.setViewport(viewport)

    // 3. Simular movimentos do mouse
    await this.simulateMouseMovements(page)

    // 4. Simular scroll humano
    await this.simulateHumanScroll(page)

    // 5. Simular pausas naturais
    await this.simulateNaturalPauses()

    // 6. Simular digitação humana
    await this.simulateHumanTyping(page)
  }

  // Simular movimentos do mouse
  private static async simulateMouseMovements(page: Page): Promise<void> {
    const movements = Math.floor(Math.random() * 5) + 3 // 3-7 movimentos
    
    for (let i = 0; i < movements; i++) {
      const x = Math.floor(Math.random() * 1920)
      const y = Math.floor(Math.random() * 1080)
      
      await page.mouse.move(x, y, { steps: Math.floor(Math.random() * 10) + 5 })
      await this.randomDelay(100, 300)
    }
  }

  // Simular scroll humano
  private static async simulateHumanScroll(page: Page): Promise<void> {
    const scrolls = Math.floor(Math.random() * 3) + 1 // 1-3 scrolls
    
    for (let i = 0; i < scrolls; i++) {
      const scrollY = Math.floor(Math.random() * 500) + 100
      await page.evaluate((y) => {
        window.scrollBy(0, y)
      }, scrollY)
      
      await this.randomDelay(500, 1500)
    }
  }

  // Simular pausas naturais
  private static async simulateNaturalPauses(): Promise<void> {
    const pauseTime = Math.floor(Math.random() * 2000) + 1000 // 1-3 segundos
    await new Promise(resolve => setTimeout(resolve, pauseTime))
  }

  // Simular digitação humana
  private static async simulateHumanTyping(page: Page): Promise<void> {
    // Simular digitação com velocidade variável
    await page.evaluate(() => {
      const originalType = HTMLInputElement.prototype.setValue
      HTMLInputElement.prototype.setValue = function(value: string) {
        // Simular digitação letra por letra
        this.value = ''
        for (let i = 0; i < value.length; i++) {
          setTimeout(() => {
            this.value += value[i]
            this.dispatchEvent(new Event('input', { bubbles: true }))
          }, i * (Math.random() * 100 + 50)) // 50-150ms por letra
        }
      }
    })
  }

  // Delay aleatório
  private static async randomDelay(min: number, max: number): Promise<void> {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  // Simular tempo de navegação natural
  static async simulateNaturalNavigation(page: Page, url: string): Promise<void> {
    // 1. Simular comportamento antes de navegar
    await this.simulateHumanBehavior(page)
    
    // 2. Navegar com delay natural
    await this.randomDelay(1000, 3000)
    await page.goto(url, { waitUntil: 'networkidle2' })
    
    // 3. Simular comportamento após carregar
    await this.simulateHumanBehavior(page)
  }

  // Simular interações humanas
  static async simulateHumanInteractions(page: Page): Promise<void> {
    // 1. Simular hover em elementos
    await this.simulateHover(page)
    
    // 2. Simular cliques com delay
    await this.simulateClickWithDelay(page)
    
    // 3. Simular leitura de conteúdo
    await this.simulateReading(page)
  }

  // Simular hover
  private static async simulateHover(page: Page): Promise<void> {
    const elements = await page.$$('button, a, input, textarea')
    if (elements.length > 0) {
      const randomElement = elements[Math.floor(Math.random() * elements.length)]
      await randomElement.hover()
      await this.randomDelay(200, 800)
    }
  }

  // Simular cliques com delay
  private static async simulateClickWithDelay(page: Page): Promise<void> {
    const clickableElements = await page.$$('button, a, input[type="submit"]')
    if (clickableElements.length > 0) {
      const randomElement = clickableElements[Math.floor(Math.random() * clickableElements.length)]
      
      // Simular hover antes do clique
      await randomElement.hover()
      await this.randomDelay(100, 300)
      
      // Clicar
      await randomElement.click()
      await this.randomDelay(500, 1500)
    }
  }

  // Simular leitura de conteúdo
  private static async simulateReading(page: Page): Promise<void> {
    // Simular tempo de leitura baseado no conteúdo
    const textContent = await page.evaluate(() => document.body.innerText)
    const wordCount = textContent.split(' ').length
    const readingTime = Math.min(wordCount * 50, 10000) // Máximo 10 segundos
    
    await this.randomDelay(readingTime, readingTime + 2000)
  }

  // Simular comportamento de criação de conta
  static async simulateAccountCreation(page: Page): Promise<void> {
    // 1. Simular preenchimento lento de formulário
    await this.simulateSlowFormFilling(page)
    
    // 2. Simular pausas para "pensar"
    await this.simulateThinkingPauses()
    
    // 3. Simular correções de erro
    await this.simulateErrorCorrections(page)
  }

  // Simular preenchimento lento de formulário
  private static async simulateSlowFormFilling(page: Page): Promise<void> {
    const inputs = await page.$$('input, textarea')
    
    for (const input of inputs) {
      // Simular foco no campo
      await input.focus()
      await this.randomDelay(200, 500)
      
      // Simular digitação lenta
      await this.simulateHumanTyping(page)
      await this.randomDelay(500, 1500)
    }
  }

  // Simular pausas para "pensar"
  private static async simulateThinkingPauses(): Promise<void> {
    const thinkingTime = Math.floor(Math.random() * 3000) + 2000 // 2-5 segundos
    await new Promise(resolve => setTimeout(resolve, thinkingTime))
  }

  // Simular correções de erro
  private static async simulateErrorCorrections(page: Page): Promise<void> {
    // Simular correção de erro (apagar e redigitar)
    const inputs = await page.$$('input[type="text"], input[type="email"], textarea')
    
    if (inputs.length > 0) {
      const randomInput = inputs[Math.floor(Math.random() * inputs.length)]
      
      // Simular seleção e apagamento
      await randomInput.click({ clickCount: 3 })
      await this.randomDelay(100, 200)
      await randomInput.press('Backspace')
      await this.randomDelay(200, 500)
      
      // Redigitar
      await this.simulateHumanTyping(page)
    }
  }

  // Simular comportamento de postagem
  static async simulatePostingBehavior(page: Page): Promise<void> {
    // 1. Simular tempo de edição
    await this.simulateEditingTime()
    
    // 2. Simular revisão de conteúdo
    await this.simulateContentReview(page)
    
    // 3. Simular hesitação antes de postar
    await this.simulatePostingHesitation()
  }

  // Simular tempo de edição
  private static async simulateEditingTime(): Promise<void> {
    const editingTime = Math.floor(Math.random() * 10000) + 5000 // 5-15 segundos
    await new Promise(resolve => setTimeout(resolve, editingTime))
  }

  // Simular revisão de conteúdo
  private static async simulateContentReview(page: Page): Promise<void> {
    // Simular scroll para revisar
    await this.simulateHumanScroll(page)
    
    // Simular pausa para ler
    await this.simulateReading(page)
    
    // Simular edição de texto
    const textareas = await page.$$('textarea')
    if (textareas.length > 0) {
      await textareas[0].click()
      await this.randomDelay(200, 500)
      
      // Simular edição (adicionar/remover caracteres)
      await textareas[0].press('ArrowLeft')
      await this.randomDelay(100, 200)
      await textareas[0].type(' ')
      await this.randomDelay(100, 200)
      await textareas[0].press('Backspace')
    }
  }

  // Simular hesitação antes de postar
  private static async simulatePostingHesitation(): Promise<void> {
    const hesitationTime = Math.floor(Math.random() * 5000) + 2000 // 2-7 segundos
    await new Promise(resolve => setTimeout(resolve, hesitationTime))
  }

  // Simular comportamento de navegação entre contas
  static async simulateAccountSwitching(page: Page): Promise<void> {
    // 1. Simular logout natural
    await this.simulateNaturalLogout(page)
    
    // 2. Simular pausa entre contas
    await this.simulateAccountSwitchPause()
    
    // 3. Simular login natural
    await this.simulateNaturalLogin(page)
  }

  // Simular logout natural
  private static async simulateNaturalLogout(page: Page): Promise<void> {
    // Simular navegação para logout
    await this.simulateHumanBehavior(page)
    
    // Simular clique em logout
    const logoutButton = await page.$('button[aria-label*="logout"], a[href*="logout"]')
    if (logoutButton) {
      await logoutButton.click()
      await this.randomDelay(1000, 3000)
    }
  }

  // Simular pausa entre contas
  private static async simulateAccountSwitchPause(): Promise<void> {
    const pauseTime = Math.floor(Math.random() * 30000) + 10000 // 10-40 segundos
    await new Promise(resolve => setTimeout(resolve, pauseTime))
  }

  // Simular login natural
  private static async simulateNaturalLogin(page: Page): Promise<void> {
    // Simular comportamento antes do login
    await this.simulateHumanBehavior(page)
    
    // Simular preenchimento lento de credenciais
    await this.simulateSlowFormFilling(page)
    
    // Simular hesitação antes de clicar em login
    await this.randomDelay(1000, 3000)
  }
}

