'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Target, 
  TrendingUp, 
  Hash, 
  Copy, 
  Check,
  Instagram,
  Music
} from 'lucide-react'
import toast from 'react-hot-toast'

interface HashtagsByNichoProps {
  hashtags: { [nicho: string]: string[] }
  selectedNicho: string
  onNichoChange: (nicho: string) => void
}

export default function HashtagsByNicho({ 
  hashtags, 
  selectedNicho, 
  onNichoChange 
}: HashtagsByNichoProps) {
  const [copiedHashtags, setCopiedHashtags] = useState<string[]>([])

  const nichos = [
    { id: 'fitness', name: 'Fitness', color: 'red', icon: '💪' },
    { id: 'comida', name: 'Comida', color: 'orange', icon: '🍳' },
    { id: 'tech', name: 'Tech', color: 'blue', icon: '💻' },
    { id: 'lifestyle', name: 'Lifestyle', color: 'purple', icon: '✨' },
    { id: 'educacao', name: 'Educação', color: 'green', icon: '📚' },
    { id: 'entretenimento', name: 'Entretenimento', color: 'yellow', icon: '🎭' }
  ]

  const handleCopyHashtags = (hashtags: string[]) => {
    const hashtagsText = hashtags.join(' ')
    navigator.clipboard.writeText(hashtagsText)
    setCopiedHashtags(hashtags)
    toast.success('Hashtags copiadas para a área de transferência!')
    
    setTimeout(() => {
      setCopiedHashtags([])
    }, 2000)
  }

  const getNichoColor = (color: string) => {
    switch (color) {
      case 'red': return 'text-red-500'
      case 'orange': return 'text-orange-500'
      case 'blue': return 'text-blue-500'
      case 'purple': return 'text-purple-500'
      case 'green': return 'text-green-500'
      case 'yellow': return 'text-yellow-500'
      default: return 'text-gray-500'
    }
  }

  const getNichoBgColor = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-500/10 border-red-500/20'
      case 'orange': return 'bg-orange-500/10 border-orange-500/20'
      case 'blue': return 'bg-blue-500/10 border-blue-500/20'
      case 'purple': return 'bg-purple-500/10 border-purple-500/20'
      case 'green': return 'bg-green-500/10 border-green-500/20'
      case 'yellow': return 'bg-yellow-500/10 border-yellow-500/20'
      default: return 'bg-gray-500/10 border-gray-500/20'
    }
  }

  const currentHashtags = hashtags[selectedNicho] || []
  const tiktokHashtags = currentHashtags.filter(h => h.includes('fyp') || h.includes('foryou'))
  const instagramHashtags = currentHashtags.filter(h => h.includes('reels') || h.includes('instagram'))
  const nichoHashtags = currentHashtags.filter(h => !h.includes('fyp') && !h.includes('foryou') && !h.includes('reels') && !h.includes('instagram'))

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      {/* Nicho Selector */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Hashtags Trending por Nicho</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {nichos.map((nicho) => (
            <button
              key={nicho.id}
              onClick={() => onNichoChange(nicho.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                selectedNicho === nicho.id
                  ? `${getNichoBgColor(nicho.color)} border-current`
                  : 'bg-gray-700 border-gray-600 hover:border-gray-500'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{nicho.icon}</div>
                <div className={`text-sm font-medium ${
                  selectedNicho === nicho.id ? getNichoColor(nicho.color) : 'text-gray-300'
                }`}>
                  {nicho.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hashtags Display */}
      {currentHashtags.length > 0 && (
        <div className="space-y-6">
          {/* All Hashtags */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-300">
                Todas as Hashtags para {nichos.find(n => n.id === selectedNicho)?.name}
              </h4>
              <button
                onClick={() => handleCopyHashtags(currentHashtags)}
                className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-lg hover:bg-blue-500/30 transition-colors"
              >
                {copiedHashtags.length > 0 ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>Copiar Todas</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentHashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30"
                >
                  {hashtag}
                </span>
              ))}
            </div>
          </div>

          {/* TikTok Hashtags */}
          {tiktokHashtags.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Music className="w-4 h-4 text-green-500" />
                  <h4 className="font-medium text-green-500">TikTok</h4>
                </div>
                <button
                  onClick={() => handleCopyHashtags(tiktokHashtags)}
                  className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-lg hover:bg-green-500/30 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tiktokHashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full border border-green-500/30"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Instagram Hashtags */}
          {instagramHashtags.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <h4 className="font-medium text-pink-500">Instagram</h4>
                </div>
                <button
                  onClick={() => handleCopyHashtags(instagramHashtags)}
                  className="flex items-center space-x-2 px-3 py-1 bg-pink-500/20 text-pink-300 text-sm rounded-lg hover:bg-pink-500/30 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {instagramHashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-pink-500/20 text-pink-300 text-sm rounded-full border border-pink-500/30"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nicho Specific Hashtags */}
          {nichoHashtags.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-purple-500" />
                  <h4 className="font-medium text-purple-500">Específicas do Nicho</h4>
                </div>
                <button
                  onClick={() => handleCopyHashtags(nichoHashtags)}
                  className="flex items-center space-x-2 px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-lg hover:bg-purple-500/30 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {nichoHashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

