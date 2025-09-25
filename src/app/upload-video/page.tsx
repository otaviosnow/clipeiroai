'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  BarChart3, 
  Scissors, 
  Sparkles, 
  Plus, 
  User,
  Instagram,
  Music,
  Youtube,
  ChevronLeft,
  Upload,
  RotateCcw,
  SkipForward,
  Video,
  Image,
  CheckCircle
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function UploadVideoPage() {
  const router = useRouter()
  const [selectedFormat, setSelectedFormat] = useState('video')
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File | null}>({})
  const [isUploading, setIsUploading] = useState(false)

  const formats = [
    { id: '2:1', name: '2:1', ratio: '2:1', description: 'Formato horizontal' },
    { id: '1:1', name: '1:1', ratio: '1:1', description: 'Formato quadrado' },
    { id: '2:3', name: '2:3', ratio: '2:3', description: 'Formato vertical' }
  ]

  const handleFileUpload = (formatId: string, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [formatId]: file
    }))
    toast.success(`Vídeo ${formatId} carregado com sucesso!`)
  }

  const handleContinue = () => {
    const hasUploads = Object.values(uploadedFiles).some(file => file !== null)
    if (!hasUploads) {
      toast.error('Faça upload de pelo menos um vídeo para continuar')
      return
    }
    toast.success('Vídeos processados! Redirecionando para o dashboard...')
    setTimeout(() => {
      router.push('/dashboard-dark')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Clipeiro</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors">
              <Instagram className="w-4 h-4" />
              <span>Conectar Instagram</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors">
              <Music className="w-4 h-4" />
              <span>Conectar TikTok</span>
            </button>
            
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
              Upgrade
            </button>
            
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">MR</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
          <div className="p-6">
            <div className="text-sm text-green-400 mb-2">Passo 3 ►</div>
            
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Clipeiro</span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-green-500 text-white">
                <BarChart3 className="w-5 h-5" />
                <span>Home</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <Scissors className="w-5 h-5" />
                <span>Meus cortes</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <Sparkles className="w-5 h-5" />
                <span>Insights da AI</span>
              </button>
            </nav>

            {/* New Clip Button */}
            <div className="mt-8">
              <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Novo corte</span>
              </button>
            </div>

            {/* Profile */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <User className="w-5 h-5" />
                <span>Meu Perfil</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Background Content */}
          <div className="relative">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-20 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>

            {/* Content Sections */}
            <div className="relative z-10">
              {/* Perfis e Cortes Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Per</h2>
                  <button className="flex items-center space-x-2 text-green-500 hover:text-green-400">
                    <span>Ver mais</span>
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Co</h2>
                  <button className="flex items-center space-x-2 text-green-500 hover:text-green-400">
                    <span>Ver mais</span>
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>

              {/* Mais visualizados Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Mais visualizados</h2>
                  <button className="flex items-center space-x-2 text-green-500 hover:text-green-400">
                    <span>Ver mais</span>
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
                
                {/* Video Thumbnails */}
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="aspect-video bg-gray-700 rounded-lg mb-2 flex items-center justify-center">
                        <Play className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-400">(Nome do corte)</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Upload Modal */}
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-2xl p-8 max-w-4xl w-full mx-4 border border-gray-700"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5 text-gray-400" />
                </button>
                <h2 className="text-2xl font-bold">Novo corte</h2>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Format Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Escolha o formato do vídeo</h3>
                
                <div className="mb-6">
                  <div className="text-sm text-gray-400 mb-3">Mesclar com:</div>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value="video"
                        checked={selectedFormat === 'video'}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                        className="w-4 h-4 text-green-500"
                      />
                      <span className="text-gray-300">Vídeo padrão</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="format"
                        value="image"
                        checked={selectedFormat === 'image'}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                        className="w-4 h-4 text-green-500"
                      />
                      <span className="text-gray-300">Imagem estática</span>
                    </label>
                  </div>
                </div>

                {/* Upload Areas */}
                <div className="grid grid-cols-3 gap-6">
                  {formats.map((format) => (
                    <div key={format.id} className="space-y-4">
                      <div className="text-center text-sm text-gray-400 mb-2">
                        {format.name}
                      </div>
                      
                      <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-green-500 transition-colors cursor-pointer relative">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(format.id, file)
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        
                        {uploadedFiles[format.id] ? (
                          <div className="space-y-2">
                            <CheckCircle className="w-8 h-8 text-green-500 mx-auto" />
                            <p className="text-sm text-green-500">Upload concluído</p>
                            <p className="text-xs text-gray-400">{uploadedFiles[format.id]?.name}</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                            <p className="text-sm text-gray-400">Faça upload do vídeo aqui</p>
                          </div>
                        )}
                        
                        <div className="absolute bottom-2 right-2">
                          <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                            <RotateCcw className="w-3 h-3 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors">
                  Cancelar
                </button>
                <button
                  onClick={handleContinue}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-lg transition-all flex items-center space-x-2"
                >
                  <span>Continuar</span>
                  <ChevronLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

