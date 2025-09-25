'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  Video, 
  Trash2, 
  Eye, 
  Play, 
  Tag, 
  Folder,
  Plus,
  Search,
  Filter
} from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

interface BackgroundVideo {
  _id: string
  filename: string
  originalName: string
  duration: number
  size: number
  category: string
  tags: string[]
  isActive: boolean
  createdAt: string
}

export default function AdminPage() {
  const [videos, setVideos] = useState<BackgroundVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [newCategory, setNewCategory] = useState('')
  const [newTag, setNewTag] = useState('')

  const categories = ['all', 'geral', 'animado', 'abstrato', 'natureza', 'urbano', 'tecnologia']

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/admin/background-videos')
      if (response.ok) {
        const data = await response.json()
        setVideos(data.videos)
      }
    } catch (error) {
      toast.error('Erro ao carregar vídeos')
    } finally {
      setIsLoading(false)
    }
  }

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('video', file)
      formData.append('category', newCategory || 'geral')

      const response = await fetch('/api/admin/background-videos', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        toast.success('Vídeo enviado com sucesso!')
        fetchVideos()
        setNewCategory('')
      } else {
        toast.error('Erro ao enviar vídeo')
      }
    } catch (error) {
      toast.error('Erro ao enviar vídeo')
    } finally {
      setIsUploading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm']
    },
    multiple: false
  })

  const handleDelete = async (videoId: string) => {
    if (!confirm('Tem certeza que deseja excluir este vídeo?')) return

    try {
      const response = await fetch(`/api/admin/background-videos/${videoId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Vídeo excluído com sucesso!')
        fetchVideos()
      } else {
        toast.error('Erro ao excluir vídeo')
      }
    } catch (error) {
      toast.error('Erro ao excluir vídeo')
    }
  }

  const handleToggleActive = async (videoId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/background-videos/${videoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      })

      if (response.ok) {
        toast.success('Status atualizado!')
        fetchVideos()
      } else {
        toast.error('Erro ao atualizar status')
      }
    } catch (error) {
      toast.error('Erro ao atualizar status')
    }
  }

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Painel Admin - Vídeos de Fundo
          </h1>
          <p className="text-gray-600">
            Gerencie os vídeos de fundo que serão usados na geração de clipes
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Adicionar Novo Vídeo
          </h2>
          
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 mb-4
              ${isDragActive 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
              }
            `}
          >
            <input {...getInputProps()} />
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isDragActive ? 'Solte o vídeo aqui' : 'Arraste e solte um vídeo'}
              </h3>
              
              <p className="text-gray-600 mb-4">
                ou clique para selecionar um arquivo
              </p>
              
              <div className="text-sm text-gray-500">
                Formatos: MP4, MOV, AVI, MKV, WebM
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Categoria (ex: animado, natureza)"
              className="input-field flex-1"
            />
            <button
              onClick={() => onDrop([])}
              disabled={isUploading}
              className="btn-primary disabled:opacity-50"
            >
              {isUploading ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar vídeos..."
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas as categorias' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-lg transition-all duration-300"
            >
              {/* Video Preview */}
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Preview</p>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                  video.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {video.isActive ? 'Ativo' : 'Inativo'}
                </div>
              </div>

              {/* Video Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 truncate">
                    {video.originalName}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                      {video.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDuration(video.duration)}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                {video.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {video.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                    {video.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{video.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* File Info */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Tamanho: {formatFileSize(video.size)}</p>
                  <p>Adicionado: {new Date(video.createdAt).toLocaleDateString()}</p>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleActive(video._id, video.isActive)}
                    className={`flex-1 text-sm py-2 px-3 rounded-lg transition-colors ${
                      video.isActive
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {video.isActive ? 'Desativar' : 'Ativar'}
                  </button>
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="bg-red-100 text-red-700 hover:bg-red-200 text-sm py-2 px-3 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredVideos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhum vídeo encontrado
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Tente ajustar os filtros de busca'
                : 'Adicione seu primeiro vídeo de fundo'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

