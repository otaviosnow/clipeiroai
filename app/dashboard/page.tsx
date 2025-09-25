'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  Video, 
  Settings, 
  BarChart3, 
  Users, 
  Calendar,
  LogOut,
  Play,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import VideoUpload from '@/components/VideoUpload'
import ClipsPreview from '@/components/ClipsPreview'
import ScheduleModal from '@/components/ScheduleModal'
import SocialConnections from '@/components/SocialConnections'
import BrowserPosting from '@/components/BrowserPosting'
import { DEV_MODE, MOCK_USER, MOCK_VIDEOS } from '@/lib/dev-mode'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  socialAccounts: {
    tiktok: Array<{ username: string; displayName: string; isActive: boolean }>
    instagram: Array<{ username: string; displayName: string; isActive: boolean }>
    youtube: Array<{ username: string; displayName: string; isActive: boolean }>
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('upload')
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showBrowserPosting, setShowBrowserPosting] = useState(false)
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null)
  const [selectedClipFormat, setSelectedClipFormat] = useState<string>('')

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      // Modo de desenvolvimento - usar dados mock
      if (DEV_MODE) {
        setUser(MOCK_USER)
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        router.push('/login')
      }
    } catch (error) {
      router.push('/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
      toast.success('Logout realizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao fazer logout')
    }
  }

  const handleUploadComplete = (videoData: any) => {
    setCurrentVideoId(videoData.videoId)
    setActiveTab('preview')
    toast.success('Vídeo enviado! Processando clipes...')
  }

  const handleSchedule = (clipId: string) => {
    setSelectedClipId(clipId)
    setSelectedClipFormat('') // Você pode passar o formato aqui
    setShowScheduleModal(true)
  }

  const handleScheduleComplete = () => {
    setShowScheduleModal(false)
    setSelectedClipId(null)
    setSelectedClipFormat('')
  }

  const handleBrowserPost = (clipId: string) => {
    setSelectedClipId(clipId)
    setSelectedClipFormat('') // Você pode passar o formato aqui
    setShowBrowserPosting(true)
  }

  const handleBrowserPostComplete = () => {
    setShowBrowserPosting(false)
    setSelectedClipId(null)
    setSelectedClipFormat('')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  const stats = [
    { label: 'Vídeos Processados', value: '24', icon: <Video className="w-5 h-5" />, color: 'text-blue-600' },
    { label: 'Clipes Gerados', value: '240', icon: <Zap className="w-5 h-5" />, color: 'text-purple-600' },
    { label: 'Posts Agendados', value: '12', icon: <Calendar className="w-5 h-5" />, color: 'text-green-600' },
    { label: 'Contas Conectadas', value: '8', icon: <Users className="w-5 h-5" />, color: 'text-orange-600' }
  ]

  const recentVideos = DEV_MODE ? MOCK_VIDEOS : [
    { id: 1, name: 'Meu vídeo viral', status: 'completed', clips: 10, date: '2024-01-15' },
    { id: 2, name: 'Tutorial rápido', status: 'processing', clips: 0, date: '2024-01-14' },
    { id: 3, name: 'Dica importante', status: 'completed', clips: 10, date: '2024-01-13' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Clipeiro</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Pronto para transformar seus vídeos em clipes virais?
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="card hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} bg-gray-100 p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-6"
        >
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'upload'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upload
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Clipes
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'connections'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Conexões
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === 'admin'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Admin
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-6">
          {activeTab === 'upload' && (
            <VideoUpload onUploadComplete={handleUploadComplete} />
          )}

          {activeTab === 'preview' && currentVideoId && (
            <ClipsPreview 
              videoId={currentVideoId} 
              onSchedule={handleSchedule}
              onBrowserPost={handleBrowserPost}
            />
          )}

          {activeTab === 'preview' && !currentVideoId && (
            <div className="card text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum vídeo processado
              </h3>
              <p className="text-gray-600">
                Faça upload de um vídeo para ver os clipes gerados
              </p>
            </div>
          )}

          {activeTab === 'connections' && (
            <SocialConnections />
          )}

          {activeTab === 'admin' && (
            <div className="card">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Painel Administrativo
                </h3>
                <p className="text-gray-600 mb-6">
                  Gerencie seus vídeos de fundo e configurações
                </p>
                <button 
                  onClick={() => router.push('/admin')}
                  className="btn-primary"
                >
                  Acessar Admin
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Schedule Modal */}
        {showScheduleModal && selectedClipId && (
          <ScheduleModal
            isOpen={showScheduleModal}
            onClose={handleScheduleComplete}
            clipId={selectedClipId}
            clipFormat={selectedClipFormat}
          />
        )}

        {/* Browser Posting Modal */}
        {showBrowserPosting && selectedClipId && (
          <BrowserPosting
            clipId={selectedClipId}
            clipFormat={selectedClipFormat}
            onClose={handleBrowserPostComplete}
          />
        )}
      </div>
    </div>
  )
}
