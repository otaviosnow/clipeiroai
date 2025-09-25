'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Upload, X, Play, AlertCircle, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface VideoUploadProps {
  onUploadComplete: (videoData: any) => void
}

export default function VideoUpload({ onUploadComplete }: VideoUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    
    if (!file) return

    // Validar tipo de arquivo
    if (!file.type.startsWith('video/')) {
      toast.error('Por favor, selecione um arquivo de vídeo')
      return
    }

    // Validar tamanho (máximo 500MB)
    if (file.size > 500 * 1024 * 1024) {
      toast.error('O arquivo deve ter no máximo 500MB')
      return
    }

    setUploadedFile(file)
    
    // Criar preview
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm']
    },
    multiple: false,
    maxSize: 500 * 1024 * 1024 // 500MB
  })

  const handleUpload = async () => {
    if (!uploadedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('video', uploadedFile)

      const response = await fetch('/api/videos/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erro no upload')
      }

      const data = await response.json()
      
      toast.success('Vídeo enviado com sucesso!')
      onUploadComplete(data)
      
      // Reset
      setUploadedFile(null)
      setPreviewUrl(null)
      setUploadProgress(0)
      
    } catch (error) {
      toast.error('Erro ao fazer upload do vídeo')
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }

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

  return (
    <div className="w-full">
      {!uploadedFile ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card"
        >
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200
              ${isDragActive 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
              }
            `}
          >
            <input {...getInputProps()} />
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isDragActive ? 'Solte o vídeo aqui' : 'Faça upload do seu vídeo'}
              </h3>
              
              <p className="text-gray-600 mb-6">
                Arraste e solte seu vídeo aqui ou clique para selecionar
              </p>
              
              <div className="text-sm text-gray-500 space-y-1">
                <p>Formatos suportados: MP4, MOV, AVI, MKV, WebM</p>
                <p>Tamanho máximo: 500MB</p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Vídeo Selecionado
            </h3>
            <button
              onClick={removeFile}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex space-x-4">
            {/* Preview */}
            <div className="w-32 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {previewUrl && (
                <video
                  src={previewUrl}
                  className="w-full h-full object-cover"
                  muted
                />
              )}
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">
                {uploadedFile.name}
              </h4>
              <div className="text-sm text-gray-500 space-y-1 mt-1">
                <p>Tamanho: {formatFileSize(uploadedFile.size)}</p>
                <p>Tipo: {uploadedFile.type}</p>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Enviando...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Upload Button */}
          {!isUploading && (
            <div className="mt-6 flex space-x-3">
              <button
                onClick={handleUpload}
                className="btn-primary flex-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                Enviar Vídeo
              </button>
              <button
                onClick={removeFile}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

