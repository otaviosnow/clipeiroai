'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Send, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react'
import toast from 'react-hot-toast'

interface PostData {
  id: string
  platform: 'tiktok' | 'instagram' | 'youtube'
  accountName: string
  videoPath: string
  caption: string
  hashtags: string[]
  scheduledFor?: string
  status: 'draft' | 'ready' | 'posting' | 'posted' | 'failed'
}

interface BrowserPostingProps {
  clipId: string
  clipFormat: string
  onClose: () => void
}

export default function BrowserPosting({ clipId, clipFormat, onClose }: BrowserPostingProps) {
  const [postData, setPostData] = useState<PostData>({
    id: `post-${Date.now()}`,
    platform: 'tiktok',
    accountName: 'Meu TikTok',
    videoPath: '/mock-videos/clip-1.mp4',
    caption: '',
    hashtags: [],
    status: 'draft'
  })
  
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [isPosting, setIsPosting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [postingProgress, setPostingProgress] = useState(0)

  const mockAccounts = [
    { id: 'tiktok-1', name: 'Meu TikTok', platform: 'tiktok', isActive: true },
    { id: 'tiktok-2', name: 'TikTok Negócio', platform: 'tiktok', isActive: true },
    { id: 'ig-1', name: 'Meu Instagram', platform: 'instagram', isActive: true },
    { id: 'ig-2', name: 'Instagram Pessoal', platform: 'instagram', isActive: true },
    { id: 'yt-1', name: 'Meu Canal', platform: 'youtube', isActive: true }
  ]

  const handleAccountToggle = (accountId: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId) 
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    )
  }

  const handlePost = async () => {
    if (selectedAccounts.length === 0) {
      toast.error('Selecione pelo menos uma conta')
      return
    }

    setIsPosting(true)
    setPostingProgress(0)

    try {
      // Simular processo de postagem
      for (let i = 0; i < selectedAccounts.length; i++) {
        const account = mockAccounts.find(acc => acc.id === selectedAccounts[i])
        
        // Simular abertura do navegador
        toast.success(`Abrindo ${account?.name} no navegador...`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Simular upload do vídeo
        toast.success(`Enviando vídeo para ${account?.name}...`)
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Simular preenchimento da legenda
        toast.success(`Preenchendo legenda em ${account?.name}...`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Simular postagem
        toast.success(`Postando em ${account?.name}...`)
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        setPostingProgress(((i + 1) / selectedAccounts.length) * 100)
      }

      toast.success('Posts realizados com sucesso!')
      onClose()
    } catch (error) {
      toast.error('Erro ao postar')
    } finally {
      setIsPosting(false)
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'tiktok':
        return <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs font-bold">TT</div>
      case 'instagram':
        return <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center text-white text-xs font-bold">IG</div>
      case 'youtube':
        return <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">YT</div>
      default:
        return <div className="w-6 h-6 bg-gray-500 rounded flex items-center justify-center text-white text-xs font-bold">?</div>
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Postar via Navegador
            </h2>
            <p className="text-gray-600">
              {clipFormat} - Postagem automática através do navegador
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <AlertCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Video Preview */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Preview do Vídeo
              </h3>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="btn-secondary text-sm py-2 px-4"
              >
                {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                {showPreview ? 'Ocultar' : 'Mostrar'} Preview
              </button>
            </div>
            
            {showPreview && (
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Preview do vídeo</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Account Selection */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Selecionar Contas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockAccounts.map((account) => (
                <label
                  key={account.id}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedAccounts.includes(account.id)}
                    onChange={() => handleAccountToggle(account.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center space-x-2">
                      {getPlatformIcon(account.platform)}
                      <span className="font-medium text-gray-900">{account.name}</span>
                    </div>
                    <p className="text-sm text-gray-500">@{account.name.toLowerCase().replace(' ', '_')}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Legenda
            </h3>
            <textarea
              value={postData.caption}
              onChange={(e) => setPostData(prev => ({ ...prev, caption: e.target.value }))}
              placeholder="Escreva uma legenda para seus posts..."
              className="input-field w-full h-24 resize-none"
              maxLength={2200}
            />
            <p className="text-sm text-gray-500 mt-1">
              {postData.caption.length}/2200 caracteres
            </p>
          </div>

          {/* Posting Progress */}
          {isPosting && (
            <div className="card bg-blue-50 border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Postando...
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-blue-800">
                  <span>Progresso</span>
                  <span>{Math.round(postingProgress)}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${postingProgress}%` }}
                  />
                </div>
                <p className="text-sm text-blue-700">
                  Aguarde enquanto postamos em suas contas...
                </p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="card bg-yellow-50 border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">
              Como Funciona
            </h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <p>1. O Clipeiro abrirá automaticamente suas redes sociais no navegador</p>
              <p>2. Faremos login automaticamente (se já estiver logado)</p>
              <p>3. Enviaremos o vídeo e preencheremos a legenda</p>
              <p>4. Postaremos em todas as contas selecionadas</p>
              <p>5. Você pode acompanhar o progresso em tempo real</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button
              onClick={handlePost}
              disabled={isPosting || selectedAccounts.length === 0}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPosting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Postando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Postar Agora
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

