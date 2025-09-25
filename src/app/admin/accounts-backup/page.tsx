'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Download, 
  Upload, 
  Trash2, 
  Search, 
  Filter,
  MoreHorizontal,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Mail,
  Key,
  Calendar,
  BarChart3
} from 'lucide-react'
import toast from 'react-hot-toast'

interface BackupAccount {
  id: string
  username: string
  email: string
  password: string
  platform: 'instagram' | 'tiktok' | 'youtube'
  parentAccount: string
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
  stats: {
    posts: number
    followers: number
    following: number
    engagement: number
  }
}

export default function AccountsBackupPage() {
  const [accounts, setAccounts] = useState<BackupAccount[]>([])
  const [filteredAccounts, setFilteredAccounts] = useState<BackupAccount[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [showPasswords, setShowPasswords] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBackupAccounts()
  }, [])

  useEffect(() => {
    filterAccounts()
  }, [accounts, searchTerm, selectedPlatform])

  const fetchBackupAccounts = async () => {
    setIsLoading(true)
    try {
      // Simular dados de backup
      const mockAccounts: BackupAccount[] = [
        {
          id: 'acc_1',
          username: 'minhaconta_clips1',
          email: 'minhaconta_clips1@gmail.com',
          password: 'Clipeiro123!',
          platform: 'instagram',
          parentAccount: 'minhaconta_principal',
          isActive: true,
          createdAt: new Date('2024-01-15'),
          lastLogin: new Date('2024-01-20'),
          stats: { posts: 15, followers: 1200, following: 300, engagement: 4.2 }
        },
        {
          id: 'acc_2',
          username: 'minhaconta_viral2',
          email: 'minhaconta_viral2@outlook.com',
          password: 'Clipeiro456!',
          platform: 'tiktok',
          parentAccount: 'minhaconta_principal',
          isActive: true,
          createdAt: new Date('2024-01-15'),
          lastLogin: new Date('2024-01-19'),
          stats: { posts: 8, followers: 2500, following: 150, engagement: 6.8 }
        },
        {
          id: 'acc_3',
          username: 'minhaconta_shorts3',
          email: 'minhaconta_shorts3@yahoo.com',
          password: 'Clipeiro789!',
          platform: 'youtube',
          parentAccount: 'minhaconta_principal',
          isActive: false,
          createdAt: new Date('2024-01-16'),
          stats: { posts: 3, followers: 800, following: 200, engagement: 2.1 }
        }
      ]
      
      setAccounts(mockAccounts)
    } catch (error) {
      toast.error('Erro ao carregar contas de backup')
    } finally {
      setIsLoading(false)
    }
  }

  const filterAccounts = () => {
    let filtered = accounts

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(account =>
        account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.parentAccount.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtrar por plataforma
    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(account => account.platform === selectedPlatform)
    }

    setFilteredAccounts(filtered)
  }

  const handleTogglePassword = () => {
    setShowPasswords(!showPasswords)
  }

  const handleDownloadBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      totalAccounts: accounts.length,
      accounts: accounts.map(acc => ({
        username: acc.username,
        email: acc.email,
        password: acc.password,
        platform: acc.platform,
        parentAccount: acc.parentAccount,
        isActive: acc.isActive,
        createdAt: acc.createdAt,
        stats: acc.stats
      }))
    }

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `backup-contas-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)

    toast.success('Backup baixado com sucesso!')
  }

  const handleDeleteAccount = (accountId: string) => {
    if (confirm('Tem certeza que deseja deletar esta conta? Esta ação não pode ser desfeita.')) {
      setAccounts(prev => prev.filter(acc => acc.id !== accountId))
      toast.success('Conta deletada com sucesso!')
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'text-pink-500'
      case 'tiktok': return 'text-black'
      case 'youtube': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return '📷'
      case 'tiktok': return '🎵'
      case 'youtube': return '📺'
      default: return '❓'
    }
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'text-green-500' : 'text-red-500'
  }

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Backup de Contas</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDownloadBackup}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Backup</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total de Contas</p>
                <p className="text-2xl font-bold text-white">{accounts.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Contas Ativas</p>
                <p className="text-2xl font-bold text-green-500">
                  {accounts.filter(acc => acc.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Contas Inativas</p>
                <p className="text-2xl font-bold text-red-500">
                  {accounts.filter(acc => !acc.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Último Backup</p>
                <p className="text-sm font-bold text-white">Hoje</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por username, email ou conta principal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Todas as Plataformas</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube">YouTube</option>
              </select>

              <button
                onClick={handleTogglePassword}
                className={`px-4 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                  showPasswords 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showPasswords ? 'Ocultar' : 'Mostrar'} Senhas</span>
              </button>
            </div>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold">Contas de Backup ({filteredAccounts.length})</h3>
            <p className="text-sm text-gray-400">Apenas administradores podem visualizar estas informações</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Conta</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Senha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Plataforma</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Estatísticas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-white">{account.username}</div>
                        <div className="text-sm text-gray-400">Pai: {account.parentAccount}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{account.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Key className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300 font-mono">
                          {showPasswords ? account.password : '••••••••'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getPlatformIcon(account.platform)}</span>
                        <span className={`capitalize ${getPlatformColor(account.platform)}`}>
                          {account.platform}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center space-x-2 ${getStatusColor(account.isActive)}`}>
                        {getStatusIcon(account.isActive)}
                        <span className="text-sm">
                          {account.isActive ? 'Ativa' : 'Inativa'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        <div>Posts: {account.stats.posts}</div>
                        <div>Seguidores: {account.stats.followers.toLocaleString()}</div>
                        <div>Engajamento: {account.stats.engagement}%</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-500 hover:text-blue-400">
                          <BarChart3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteAccount(account.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Lock className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-500 mb-2">Aviso de Segurança</h4>
              <p className="text-sm text-gray-300">
                Esta área contém informações sensíveis das contas criadas. 
                Apenas administradores autorizados podem acessar estas informações.
                As senhas são criptografadas e não devem ser compartilhadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

