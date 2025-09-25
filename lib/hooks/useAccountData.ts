import { useState, useEffect } from 'react'

export interface AccountData {
  totalViews: number
  totalEngagement: number
  totalFollowers: number
  clipsGenerated: number
  lastUpdated: string
}

export interface ConnectedAccount {
  id: string
  platform: 'instagram' | 'tiktok' | 'youtube'
  username: string
  followers: number
  views: number
  engagement: number
  isActive: boolean
}

export function useAccountData() {
  const [accountData, setAccountData] = useState<AccountData>({
    totalViews: 0,
    totalEngagement: 0,
    totalFollowers: 0,
    clipsGenerated: 0,
    lastUpdated: new Date().toISOString()
  })
  
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAccountData()
  }, [])

  const fetchAccountData = async () => {
    try {
      setIsLoading(true)
      
      // Simular busca de dados reais das contas conectadas
      const mockConnectedAccounts: ConnectedAccount[] = [
        {
          id: 'ig-1',
          platform: 'instagram',
          username: '@clipeiro_ai',
          followers: 1250,
          views: 8500,
          engagement: 7.2,
          isActive: true
        },
        {
          id: 'tt-1',
          platform: 'tiktok',
          username: '@clipeiro_ai',
          followers: 2100,
          views: 15000,
          engagement: 9.1,
          isActive: true
        },
        {
          id: 'yt-1',
          platform: 'youtube',
          username: 'Clipeiro AI',
          followers: 850,
          views: 3200,
          engagement: 6.8,
          isActive: true
        }
      ]

      // Calcular totais
      const totalViews = mockConnectedAccounts.reduce((sum, account) => sum + account.views, 0)
      const totalFollowers = mockConnectedAccounts.reduce((sum, account) => sum + account.followers, 0)
      const avgEngagement = mockConnectedAccounts.reduce((sum, account) => sum + account.engagement, 0) / mockConnectedAccounts.length
      const clipsGenerated = mockConnectedAccounts.length * 8 // Simular clipes gerados

      setConnectedAccounts(mockConnectedAccounts)
      setAccountData({
        totalViews,
        totalEngagement: avgEngagement,
        totalFollowers,
        clipsGenerated,
        lastUpdated: new Date().toISOString()
      })

      console.log('📊 Account data fetched:', {
        totalViews,
        totalFollowers,
        avgEngagement,
        clipsGenerated
      })

    } catch (error) {
      console.error('❌ Error fetching account data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = () => {
    fetchAccountData()
  }

  return {
    accountData,
    connectedAccounts,
    isLoading,
    refreshData
  }
}
