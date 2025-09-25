'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, ChevronLeft, ChevronRight, Play, Square, RectangleHorizontal, RectangleVertical } from 'lucide-react'
import toast from 'react-hot-toast'

interface VideoFormatModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: (format: string, mergeType: string) => void
}

export default function VideoFormatModal({ isOpen, onClose, onContinue }: VideoFormatModalProps) {
  const [selectedFormat, setSelectedFormat] = useState('')
  const [mergeType, setMergeType] = useState('video')
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File | null}>({})

  const formats = [
    {
      id: 'story',
      name: 'Story',
      ratio: '9:16',
      description: 'Instagram Stories, TikTok, YouTube Shorts',
      icon: <RectangleVertical className="w-8 h-8" />,
      color: 'from-pink-500 to-purple-600'
    },
    {
      id: 'square',
      name: 'Quadrado',
      ratio: '1:1',
      description: 'Instagram Feed, Facebook',
      icon: <Square className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'landscape',
      name: 'Paisagem',
      ratio: '16:9',
      description: 'YouTube, LinkedIn',
      icon: <RectangleHorizontal className="w-8 h-8" />,
      color: 'from-green-500 to-teal-600'
    }
  ]

  const handleFileUpload = (formatId: string, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [formatId]: file
    }))
    setSelectedFormat(formatId)
    toast.success(`Vídeo ${formatId} carregado com sucesso!`)
  }

  const handleContinue = () => {
    if (!selectedFormat) {
      toast.error('Selecione um formato de vídeo')
      return
    }
    onContinue(selectedFormat, mergeType)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-gray-900 rounded-2xl p-8 w-full max-w-4xl border border-gray-700 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Novo corte</h2>
                <p className="text-sm text-gray-400">Escolha o formato do vídeo</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Merge Type Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Mesclar com:</h3>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="mergeType"
                  value="video"
                  checked={mergeType === 'video'}
                  onChange={(e) => setMergeType(e.target.value)}
                  className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 focus:ring-blue-500"
                />
                <span className="text-gray-300">Vídeo padrão</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="mergeType"
                  value="image"
                  checked={mergeType === 'image'}
                  onChange={(e) => setMergeType(e.target.value)}
                  className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 focus:ring-blue-500"
                />
                <span className="text-gray-300">Imagem estática</span>
              </label>
            </div>
          </div>

          {/* Format Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {formats.map((format) => (
              <div
                key={format.id}
                className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  selectedFormat === format.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedFormat(format.id)}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${format.color} rounded-xl flex items-center justify-center`}>
                    {format.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{format.name}</h3>
                  <p className="text-sm text-gray-400 mb-2">{format.ratio}</p>
                  <p className="text-xs text-gray-500 mb-4">{format.description}</p>
                  
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-gray-500 transition-colors">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleFileUpload(format.id, file)
                      }}
                      className="hidden"
                      id={`upload-${format.id}`}
                    />
                    <label
                      htmlFor={`upload-${format.id}`}
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <Upload className="w-6 h-6 text-gray-400" />
                      <span className="text-sm text-gray-400">
                        {uploadedFiles[format.id] ? 'Vídeo carregado' : 'Faça upload do vídeo aqui'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl transition-all flex items-center space-x-2"
            >
              <span>Continuar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

