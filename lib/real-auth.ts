// Sistema de autenticação real para fase de teste
// Depois será substituído por autenticação real com APIs

export interface AuthCredentials {
  username: string
  password: string
  platform: 'instagram' | 'tiktok' | 'youtube'
}

export interface AuthResult {
  success: boolean
  message: string
  userData?: {
    id: string
    username: string
    displayName: string
    profilePicture?: string
    followers?: number
    following?: number
  }
}

// Simulação de autenticação real
export async function authenticateUser(credentials: AuthCredentials): Promise<AuthResult> {
  const { username, password, platform } = credentials

  // Validações básicas para fase de teste
  if (!username || !password) {
    return {
      success: false,
      message: 'Username e password são obrigatórios'
    }
  }

  if (username.length < 3) {
    return {
      success: false,
      message: 'Username deve ter pelo menos 3 caracteres'
    }
  }

  if (password.length < 6) {
    return {
      success: false,
      message: 'Password deve ter pelo menos 6 caracteres'
    }
  }

  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Simular autenticação real
  // Na fase de teste, qualquer credencial válida funciona
  const success = await simulatePlatformAuth(platform, username, password)

  if (!success) {
    return {
      success: false,
      message: 'Credenciais inválidas'
    }
  }

  // Retornar dados simulados do usuário
  const userData = generateMockUserData(username, platform)

  return {
    success: true,
    message: 'Autenticação realizada com sucesso',
    userData
  }
}

// Simular autenticação com plataformas
async function simulatePlatformAuth(
  platform: 'instagram' | 'tiktok' | 'youtube',
  username: string,
  password: string
): Promise<boolean> {
  // Simular diferentes comportamentos por plataforma
  
  switch (platform) {
    case 'instagram':
      // Instagram: aceita qualquer username/password válidos
      return username.length >= 3 && password.length >= 6
      
    case 'tiktok':
      // TikTok: aceita qualquer username/password válidos
      return username.length >= 3 && password.length >= 6
      
    case 'youtube':
      // YouTube: aceita qualquer email válido e password
      return username.includes('@') && password.length >= 6
      
    default:
      return false
  }
}

// Gerar dados simulados do usuário
function generateMockUserData(username: string, platform: string) {
  const baseFollowers = Math.floor(Math.random() * 10000) + 1000
  const baseFollowing = Math.floor(Math.random() * 1000) + 100

  return {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    username,
    displayName: username.charAt(0).toUpperCase() + username.slice(1),
    profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    followers: baseFollowers,
    following: baseFollowing
  }
}

// Verificar se usuário está autenticado
export function isUserAuthenticated(platform: string): boolean {
  // Verificar se existe token/sessão válida
  // Por enquanto, sempre retorna true para fase de teste
  return true
}

// Logout do usuário
export function logoutUser(platform: string): void {
  // Limpar tokens/sessões
  // Por enquanto, apenas log
  console.log(`Logout realizado para ${platform}`)
}

// Obter dados do usuário autenticado
export function getAuthenticatedUser(platform: string) {
  // Retornar dados do usuário logado
  // Por enquanto, retorna dados simulados
  return {
    id: `user_${platform}_${Date.now()}`,
    username: `user_${platform}`,
    displayName: `User ${platform}`,
    platform,
    isAuthenticated: true
  }
}

