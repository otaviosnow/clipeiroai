'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Home } from 'lucide-react'

interface NavigationHeaderProps {
  title: string
  icon?: React.ReactNode
  showBackButton?: boolean
  showHomeButton?: boolean
  onBack?: () => void
  onHome?: () => void
}

export default function NavigationHeader({ 
  title, 
  icon, 
  showBackButton = true, 
  showHomeButton = true,
  onBack,
  onHome 
}: NavigationHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  const handleHome = () => {
    if (onHome) {
      onHome()
    } else {
      router.push('/dashboard-dark')
    }
  }

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          {showHomeButton && (
            <button 
              onClick={handleHome}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Dashboard"
            >
              <Home className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center space-x-2">
            {icon && (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                {icon}
              </div>
            )}
            <span className="text-xl font-bold">{title}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

