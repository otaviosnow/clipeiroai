'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Shield, 
  Play, 
  Pause,
  X,
  RefreshCw,
  Info
} from 'lucide-react'
import toast from 'react-hot-toast'
import { PauseSystem, PauseStatus } from '@/lib/automation/pause-system'

interface PauseAlertProps {
  onResume?: () => void
  onAcknowledge?: () => void
}

export default function PauseAlert({ onResume, onAcknowledge }: PauseAlertProps) {
  const [pauseStatus, setPauseStatus] = useState<PauseStatus | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const pauseSystem = PauseSystem.getInstance()
    
    // Verificar status inicial
    const initialStatus = pauseSystem.getPauseStatus()
    if (initialStatus.isPaused) {
      setPauseStatus(initialStatus)
      setIsVisible(true)
    }

    // Adicionar listener para mudanças
    const handleStatusChange = (status: PauseStatus) => {
      setPauseStatus(status)
      setIsVisible(status.isPaused)
      
      if (status.isPaused) {
        toast.error(`Sistema pausado: ${status.reason?.message}`, {
          duration: 10000,
          position: 'top-center'
        })
      } else {
        toast.success('Sistema retomado com sucesso!', {
          duration: 5000,
          position: 'top-center'
        })
      }
    }

    pauseSystem.addListener(handleStatusChange)

    return () => {
      pauseSystem.removeListener(handleStatusChange)
    }
  }, [])

  const handleAcknowledge = () => {
    const pauseSystem = PauseSystem.getInstance()
    pauseSystem.acknowledgePause()
    onAcknowledge?.()
    toast.success('Problema confirmado. Aguardando resolução...')
  }

  const handleResume = () => {
    const pauseSystem = PauseSystem.getInstance()
    pauseSystem.resumeSystem()
    onResume?.()
    toast.success('Sistema retomado!')
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-yellow-500'
      case 'medium': return 'text-orange-500'
      case 'high': return 'text-red-500'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-500'
    }
  }

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-yellow-500/10 border-yellow-500/20'
      case 'medium': return 'bg-orange-500/10 border-orange-500/20'
      case 'high': return 'bg-red-500/10 border-red-500/20'
      case 'critical': return 'bg-red-600/10 border-red-600/20'
      default: return 'bg-gray-500/10 border-gray-500/20'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <Info className="w-5 h-5" />
      case 'medium': return <AlertTriangle className="w-5 h-5" />
      case 'high': return <AlertTriangle className="w-5 h-5" />
      case 'critical': return <Shield className="w-5 h-5" />
      default: return <Info className="w-5 h-5" />
    }
  }

  if (!isVisible || !pauseStatus) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl mx-4"
      >
        <div className={`rounded-xl border-2 p-6 ${getSeverityBg(pauseStatus.reason?.severity || 'medium')}`}>
          <div className="flex items-start space-x-4">
            <div className={`flex-shrink-0 ${getSeverityColor(pauseStatus.reason?.severity || 'medium')}`}>
              {getSeverityIcon(pauseStatus.reason?.severity || 'medium')}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-white">
                  Sistema Pausado
                </h3>
                <div className="flex items-center space-x-2">
                  <Pause className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500 font-medium">PAUSADO</span>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                {pauseStatus.reason?.message}
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Detectado: {pauseStatus.pausedAt?.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Severidade: {pauseStatus.reason?.severity}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {!pauseStatus.userAcknowledged ? (
                  <button
                    onClick={handleAcknowledge}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirmar Conhecimento</span>
                  </button>
                ) : pauseStatus.canResume ? (
                  <button
                    onClick={handleResume}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    <span>Retomar Sistema</span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 text-yellow-500">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Aguardando resolução automática...</span>
                  </div>
                )}
                
                {pauseStatus.reason?.autoResolve && (
                  <div className="text-sm text-gray-400">
                    Resolução automática em: {pauseStatus.reason.autoResolveTime} minutos
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

