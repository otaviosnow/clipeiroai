'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Calendar, Clock, Users, Hash, Image, Save } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'

interface SocialAccount {
  id: string
  username: string
  displayName: string
  platform: 'tiktok' | 'instagram' | 'youtube'
  isActive: boolean
}

interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  clipId: string
  clipFormat: string
}

export default function ScheduleModal({ isOpen, onClose, clipId, clipFormat }: ScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>('12:00')
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])
  const [caption, setCaption] = useState('')
  const [hashtags, setHashtags] = useState<string[]>([])
  const [hashtagInput, setHashtagInput] = useState('')
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchSocialAccounts()
    }
  }, [isOpen])

  const fetchSocialAccounts = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        const accounts: SocialAccount[] = []
        
        // Converter contas do usuário para formato SocialAccount
        data.user.socialAccounts.tiktok.forEach((account: any) => {
          accounts.push({ ...account, platform: 'tiktok' })
        })
        data.user.socialAccounts.instagram.forEach((account: any) => {
          accounts.push({ ...account, platform: 'instagram' })
        })
        data.user.socialAccounts.youtube.forEach((account: any) => {
          accounts.push({ ...account, platform: 'youtube' })
        })
        
        setSocialAccounts(accounts.filter(acc => acc.isActive))
      }
    } catch (error) {
      toast.error('Erro ao carregar contas')
    }
  }

  const handleAccountToggle = (accountId: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId) 
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    )
  }

  const handleAddHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
      setHashtags(prev => [...prev, hashtagInput.trim()])
      setHashtagInput('')
    }
  }

  const handleRemoveHashtag = (hashtag: string) => {
    setHashtags(prev => prev.filter(h => h !== hashtag))
  }

  const handleSubmit = async () => {
    if (selectedAccounts.length === 0) {
      toast.error('Selecione pelo menos uma conta')
      return
    }

    if (selectedDate < new Date()) {
      toast.error('A data deve ser no futuro')
      return
    }

    setIsLoading(true)

    try {
      const scheduledDateTime = new Date(selectedDate)
      const [hours, minutes] = selectedTime.split(':')
      scheduledDateTime.setHours(parseInt(hours), parseInt(minutes))

      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clipId,
          accounts: selectedAccounts,
          scheduledFor: scheduledDateTime.toISOString(),
          caption,
          hashtags
        }),
      })

      if (response.ok) {
        toast.success('Posts agendados com sucesso!')
        onClose()
      } else {
        const data = await response.json()
        toast.error(data.message || 'Erro ao agendar posts')
      }
    } catch (error) {
      toast.error('Erro ao agendar posts')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Agendar Post
            </h2>
            <p className="text-gray-600">
              {clipFormat}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Data
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date || new Date())}
                minDate={new Date()}
                className="input-field w-full"
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Horário
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="input-field w-full"
              />
            </div>
          </div>

          {/* Social Accounts */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Users className="w-4 h-4 inline mr-2" />
              Contas para Postar
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {socialAccounts.map((account) => (
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
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white ${
                        account.platform === 'tiktok' ? 'bg-black' :
                        account.platform === 'instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                        'bg-red-600'
                      }`}>
                        {account.platform === 'tiktok' ? 'TT' :
                         account.platform === 'instagram' ? 'IG' : 'YT'}
                      </div>
                      <span className="font-medium text-gray-900">{account.displayName}</span>
                    </div>
                    <p className="text-sm text-gray-500">@{account.username}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Legenda
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Escreva uma legenda para seus posts..."
              className="input-field w-full h-24 resize-none"
              maxLength={2200}
            />
            <p className="text-sm text-gray-500 mt-1">
              {caption.length}/2200 caracteres
            </p>
          </div>

          {/* Hashtags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Hash className="w-4 h-4 inline mr-2" />
              Hashtags
            </label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddHashtag()}
                placeholder="Adicionar hashtag..."
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={handleAddHashtag}
                className="btn-secondary"
              >
                Adicionar
              </button>
            </div>
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {hashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                  >
                    #{hashtag}
                    <button
                      onClick={() => handleRemoveHashtag(hashtag)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
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
              onClick={handleSubmit}
              disabled={isLoading || selectedAccounts.length === 0}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Agendando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Agendar Posts
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

