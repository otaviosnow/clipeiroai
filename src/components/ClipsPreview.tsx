'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Download, 
  Share2, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Clip {
  id: string
  format: string
  filename: string
  path: string
  thumbnail: string
  duration: number
  status: 'processing' | 'completed' | 'failed'
  createdAt: string
}

interface ClipsPreviewProps {
  videoId: string
  onSchedule: (clipId: string) => void
  onBrowserPost: (clipId: string) => void
}

export default function ClipsPreview({ videoId, onSchedule, onBrowserPost }: ClipsPreviewProps) {
  const [clips, setClips] = useState<Clip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    fetchClips()
  }, [videoId])

  const fetchClips = async () => {
    try {
      const response = await fetch(`/api/videos/${videoId}/clips`)
      if (response.ok) {
        const data = await response.json()
        setClips(data.clips)
      }
    } catch (error) {
      toast.error('Erro ao carregar clipes')
    } finally {
      setIsLoading(false)
    }
  }

  const getFormatDisplayName = (format: string) => {
    const formatNames: { [key: string]: string } = {
      'split-screen-top': 'Tela Dividida (Topo)',
      'split-screen-bottom': 'Tela Dividida (Base)',
      'zoom-focus': 'Zoom Focado',
      'caption-style-1': 'Legenda Estilo 1',
      'caption-style-2': 'Legenda Estilo 2',
      'border-effect': 'Efeito de Borda',
      'overlay-text': 'Texto Overlay',
      'highlight-clip': 'Destaque',
      'slow-motion': 'Câmera Lenta',
      'fast-motion': 'Acelerado'
    }
    return formatNames[format] || format
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-500" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Pronto'
      case 'processing':
        return 'Processando'
      case 'failed':
        return 'Erro'
      default:
        return 'Aguardando'
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  const handleDownload = (clip: Clip) => {
    // Implementar download
    toast.success('Download iniciado!')
  }

  const handleSchedule = (clip: Clip) => {
    onSchedule(clip.id)
  }

  const handleBrowserPost = (clip: Clip) => {
    onBrowserPost(clip.id)
  }

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-gray-600">Carregando clipes...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Seus Clipes Estão Prontos! 🎉
            </h2>
            <p className="text-gray-600">
              {clips.filter(c => c.status === 'completed').length} de {clips.length} clipes processados
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Baixar Todos
            </button>
            <button className="btn-primary">
              <Share2 className="w-4 h-4 mr-2" />
              Postar Todos
            </button>
          </div>
        </div>
      </div>

      {/* Clips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clips.map((clip, index) => (
          <motion.div
            key={clip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:shadow-lg transition-all duration-300"
          >
            {/* Video Preview */}
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              {clip.status === 'completed' ? (
                <div className="relative w-full h-full group">
                  <video
                    className="w-full h-full object-cover"
                    poster={clip.thumbnail}
                    muted={isMuted}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    <source src={clip.path} type="video/mp4" />
                  </video>
                  
                  {/* Play/Pause Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                    <button
                      onClick={handlePlayPause}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 text-gray-900" />
                      ) : (
                        <Play className="w-6 h-6 text-gray-900" />
                      )}
                    </button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {Math.floor(clip.duration / 60)}:{(clip.duration % 60).toFixed(0).padStart(2, '0')}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    {getStatusIcon(clip.status)}
                    <p className="text-sm text-gray-600 mt-2">
                      {getStatusText(clip.status)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Clip Info */}
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {getFormatDisplayName(clip.format)}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusIcon(clip.status)}
                  <span className="text-sm text-gray-600">
                    {getStatusText(clip.status)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              {clip.status === 'completed' && (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(clip)}
                      className="flex-1 btn-secondary text-sm py-2"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Baixar
                    </button>
                    <button
                      onClick={() => handleSchedule(clip.id)}
                      className="flex-1 btn-primary text-sm py-2"
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Agendar
                    </button>
                  </div>
                  <button
                    onClick={() => handleBrowserPost(clip)}
                    className="w-full btn-primary text-sm py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Postar via Navegador
                  </button>
                </div>
              )}

              {clip.status === 'processing' && (
                <div className="flex items-center justify-center py-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Processando...</span>
                </div>
              )}

              {clip.status === 'failed' && (
                <div className="text-center py-2">
                  <p className="text-sm text-red-600">Erro no processamento</p>
                  <button className="text-xs text-primary-600 hover:text-primary-500 mt-1">
                    Tentar novamente
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {clips.length === 0 && (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum clipe encontrado
          </h3>
          <p className="text-gray-600">
            Faça upload de um vídeo para gerar clipes automaticamente
          </p>
        </div>
      )}
    </div>
  )
}
