'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { authenticateUser, AuthCredentials } from '@/lib/real-auth'

interface RealLoginModalProps {
  isOpen: boolean
  onClose: () => void
  platform: 'instagram' | 'tiktok' | 'youtube'
  onSuccess: (platform: string, credentials: { username: string, password: string }) => void
}

export default function RealLoginModal({ isOpen, onClose, platform, onSuccess }: RealLoginModalProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const platformInfo = {
    instagram: {
      name: 'Instagram',
      color: 'from-pink-500 to-purple-600',
      icon: '📷',
      placeholder: 'Nome de usuário ou email'
    },
    tiktok: {
      name: 'TikTok',
      color: 'from-black to-gray-800',
      icon: '🎵',
      placeholder: 'Nome de usuário ou email'
    },
    youtube: {
      name: 'YouTube',
      color: 'from-red-500 to-red-600',
      icon: '📺',
      placeholder: 'Email do Google'
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username || !password) {
      toast.error('Preencha todos os campos')
      return
    }

    setIsLoading(true)
    toast.loading(`Conectando ao ${platformInfo[platform].name}...`, { id: 'loginToast' })

    try {
      // Usar sistema de autenticação real
      const credentials: AuthCredentials = {
        username,
        password,
        platform
      }

      const result = await authenticateUser(credentials)
      
      if (result.success) {
        toast.success(`${platformInfo[platform].name} conectado com sucesso!`, { id: 'loginToast' })
        onSuccess(platform, { username, password })
        onClose()
        setUsername('')
        setPassword('')
      } else {
        toast.error(result.message, { id: 'loginToast' })
      }
    } catch (error) {
      toast.error('Erro ao conectar. Tente novamente.', { id: 'loginToast' })
    } finally {
      setIsLoading(false)
    }
  }


  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-gray-900 rounded-2xl p-8 w-full max-w-md border border-gray-700 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${platformInfo[platform].color} rounded-xl flex items-center justify-center`}>
                <span className="text-xl">{platformInfo[platform].icon}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Conectar {platformInfo[platform].name}</h2>
                <p className="text-sm text-gray-400">Digite suas credenciais</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {platform === 'youtube' ? 'Email' : 'Nome de usuário'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={platformInfo[platform].placeholder}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">Lembrar de mim</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Esqueceu a senha?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 bg-gradient-to-r ${platformInfo[platform].color} hover:opacity-90 text-white rounded-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Conectando...</span>
                </>
              ) : (
                <>
                  <span>Conectar {platformInfo[platform].name}</span>
                </>
              )}
            </button>
          </form>

          {/* Test Mode Notice */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
            <p className="text-sm text-blue-300 text-center">
              <strong>Modo Teste:</strong> Qualquer login/senha válidos funcionam
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
