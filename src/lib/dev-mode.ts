// Modo de desenvolvimento - bypass de autenticação
export const DEV_MODE = process.env.NODE_ENV === 'development' && process.env.DEV_BYPASS_AUTH === 'true'

export const MOCK_USER = {
  id: 'dev-user-123',
  name: 'Usuário de Teste',
  email: 'teste@clipeiro.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  isEmailVerified: true,
  socialAccounts: {
    tiktok: [
      {
        id: 'tiktok-1',
        username: 'meu_tiktok',
        displayName: 'Meu TikTok',
        accessToken: 'mock-token',
        isActive: true
      },
      {
        id: 'tiktok-2', 
        username: 'tiktok_negocio',
        displayName: 'TikTok Negócio',
        accessToken: 'mock-token',
        isActive: true
      }
    ],
    instagram: [
      {
        id: 'ig-1',
        username: 'meu_instagram',
        displayName: 'Meu Instagram',
        accessToken: 'mock-token',
        isActive: true
      },
      {
        id: 'ig-2',
        username: 'instagram_pessoal',
        displayName: 'Instagram Pessoal',
        accessToken: 'mock-token',
        isActive: true
      }
    ],
    youtube: [
      {
        id: 'yt-1',
        username: 'Meu Canal',
        displayName: 'Meu Canal YouTube',
        accessToken: 'mock-token',
        isActive: true
      }
    ]
  }
}

export const MOCK_VIDEOS = [
  {
    id: 'video-1',
    name: 'Meu vídeo viral',
    status: 'completed',
    clips: 10,
    date: '2024-01-15',
    duration: 120,
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop'
  },
  {
    id: 'video-2',
    name: 'Tutorial rápido',
    status: 'processing',
    clips: 0,
    date: '2024-01-14',
    duration: 90,
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop'
  },
  {
    id: 'video-3',
    name: 'Dica importante',
    status: 'completed',
    clips: 10,
    date: '2024-01-13',
    duration: 60,
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop'
  }
]

export const MOCK_CLIPS = [
  {
    id: 'clip-1',
    format: 'split-screen-top',
    filename: 'clip-1.mp4',
    path: '/mock-videos/clip-1.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop',
    duration: 120,
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'clip-2',
    format: 'split-screen-bottom',
    filename: 'clip-2.mp4',
    path: '/mock-videos/clip-2.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop',
    duration: 120,
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'clip-3',
    format: 'zoom-focus',
    filename: 'clip-3.mp4',
    path: '/mock-videos/clip-3.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop',
    duration: 120,
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'clip-4',
    format: 'caption-style-1',
    filename: 'clip-4.mp4',
    path: '/mock-videos/clip-4.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop',
    duration: 120,
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'clip-5',
    format: 'caption-style-2',
    filename: 'clip-5.mp4',
    path: '/mock-videos/clip-5.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop',
    duration: 120,
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'clip-6',
    format: 'border-effect',
    filename: 'clip-6.mp4',
    path: '/mock-videos/clip-6.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop',
    duration: 120,
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'clip-7',
    format: 'overlay-text',
    filename: 'clip-7.mp4',
    path: '/mock-videos/clip-7.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop',
    duration: 120,
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'clip-8',
    format: 'highlight-clip',
    filename: 'clip-8.mp4',
    path: '/mock-videos/clip-8.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop',
    duration: 120,
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'clip-9',
    format: 'slow-motion',
    filename: 'clip-9.mp4',
    path: '/mock-videos/clip-9.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop',
    duration: 120,
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    id: 'clip-10',
    format: 'fast-motion',
    filename: 'clip-10.mp4',
    path: '/mock-videos/clip-10.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=300&h=400&fit=crop',
    duration: 120,
    status: 'completed',
    createdAt: new Date().toISOString()
  }
]

