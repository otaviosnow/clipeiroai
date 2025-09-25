'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home, Upload, Video, Image, Square, Monitor } from 'lucide-react'

export default function UploadVideo() {
  const router = useRouter()
  const [selectedFormat, setSelectedFormat] = useState('story')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  console.log('📤 Upload Video page rendered')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('📁 File selected:', file.name)
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    
    setIsUploading(true)
    console.log('📤 Uploading file:', selectedFile.name, 'Format:', selectedFormat)
    
    // Simulate upload
    setTimeout(() => {
      console.log('✅ Upload successful')
      setIsUploading(false)
      router.push('/dashboard-dark')
    }, 2000)
  }

  const formatOptions = [
    { id: 'story', name: 'Story', icon: Image, ratio: '9:16', description: 'Para Instagram Stories e TikTok' },
    { id: 'square', name: 'Quadrado', icon: Square, ratio: '1:1', description: 'Para feed do Instagram' },
    { id: 'landscape', name: 'Paisagem', icon: Monitor, ratio: '16:9', description: 'Para YouTube e LinkedIn' }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard-dark')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <Upload className="w-6 h-6 text-blue-500" />
                <span className="text-xl font-bold">Upload de Vídeo</span>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/dashboard-dark')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Upload de Vídeo</h1>
          <p className="text-gray-400">
            Selecione o formato e faça upload do seu vídeo para criar clipes automáticos
          </p>
        </div>

        {/* Format Selection */}
        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 mb-8">
          <h3 className="text-xl font-semibold mb-4">Selecione o Formato</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {formatOptions.map((format) => {
              const Icon = format.icon
              return (
                <button
                  key={format.id}
                  onClick={() => {
                    console.log('📐 Format selected:', format.id)
                    setSelectedFormat(format.id)
                  }}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    selectedFormat === format.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-center">
                    <div className="font-semibold">{format.name}</div>
                    <div className="text-sm text-gray-400">{format.ratio}</div>
                    <div className="text-xs text-gray-500 mt-1">{format.description}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* File Upload */}
        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 mb-8">
          <h3 className="text-xl font-semibold mb-4">Upload do Arquivo</h3>
          
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-gray-600 transition-colors">
            <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            
            {selectedFile ? (
              <div>
                <p className="text-lg font-semibold mb-2">{selectedFile.name}</p>
                <p className="text-sm text-gray-400">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <button
                  onClick={() => {
                    console.log('🗑️ File removed')
                    setSelectedFile(null)
                  }}
                  className="mt-4 text-red-500 hover:text-red-400 transition-colors"
                >
                  Remover arquivo
                </button>
              </div>
            ) : (
              <div>
                <p className="text-lg mb-2">Arraste e solte seu vídeo aqui</p>
                <p className="text-sm text-gray-400 mb-4">ou</p>
                <label className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                  Selecionar arquivo
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <div className="text-center">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Enviando...' : 'Fazer Upload'}
          </button>
        </div>
      </main>
    </div>
  )
}
