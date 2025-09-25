'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Globe,
  Smartphone,
  Monitor,
  Wifi,
  WifiOff
} from 'lucide-react'
import toast from 'react-hot-toast'

interface SocialAccount {
  id: string
  username: string
  displayName: string
  platform: 'tiktok' | 'instagram' | 'youtube'
  isActive: boolean
  connectionType: 'browser' | 'api'
  lastSync?: string
}

interface BrowserConnection {
  id: string
  name: string
  platform: string
  status: 'connected' | 'disconnected' | 'error'
  lastActivity: string
  userAgent: string
}

export default function SocialConnections() {
  const [accounts, setAccounts] = useState<SocialAccount[]>([])
  const [browserConnections, setBrowserConnections] = useState<BrowserConnection[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    fetchConnections()
  }, [])

  const fetchConnections = async () => {
    try {
      // Simular busca de conexões do navegador
      const mockConnections: BrowserConnection[] = [
        {
          id: 'browser-1',
          name: 'Chrome - TikTok',
          platform: 'tiktok',
          status: 'connected',
          lastActivity: '2 minutos atrás',
          userAgent: 'Chrome/120.0.0.0'
        },
        {
          id: 'browser-2',
          name: 'Chrome - Instagram',
          platform: 'instagram',
          status: 'connected',
          lastActivity: '5 minutos atrás',
          userAgent: 'Chrome/120.0.0.0'
        },
        {
          id: 'browser-3',
          name: 'Firefox - YouTube',
          platform: 'youtube',
          status: 'disconnected',
          lastActivity: '1 hora atrás',
          userAgent: 'Firefox/121.0.0'
        }
      ]
      setBrowserConnections(mockConnections)
    } catch (error) {
      toast.error('Erro ao carregar conexões')
    }
  }

  const scanBrowserConnections = async () => {
    setIsScanning(true)
    
    // Simular escaneamento
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simular descoberta de novas conexões
    const newConnections: BrowserConnection[] = [
      {
        id: 'browser-4',
        name: 'Edge - TikTok',
        platform: 'tiktok',
        status: 'connected',
        lastActivity: 'Agora',
        userAgent: 'Edge/120.0.0.0'
      }
    ]
    
    setBrowserConnections(prev => [...prev, ...newConnections])
    setIsScanning(false)
    toast.success('Novas conexões encontradas!')
  }

  const connectAccount = async (connection: BrowserConnection) => {
    try {
      const newAccount: SocialAccount = {
        id: `account-${Date.now()}`,
        username: connection.name.split(' - ')[1].toLowerCase(),
        displayName: connection.name,
        platform: connection.platform as any,
        isActive: true,
        connectionType: 'browser',
        lastSync: new Date().toISOString()
      }
      
      setAccounts(prev => [...prev, newAccount])
      toast.success('Conta conectada com sucesso!')
    } catch (error) {
      toast.error('Erro ao conectar conta')
    }
  }

  const disconnectAccount = async (accountId: string) => {
    try {
      setAccounts(prev => prev.filter(acc => acc.id !== accountId))
      toast.success('Conta desconectada')
    } catch (error) {
      toast.error('Erro ao desconectar conta')
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
        return <Globe className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'disconnected':
        return <WifiOff className="w-4 h-4 text-gray-400" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Wifi className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Conexões do Navegador
          </h2>
          <p className="text-gray-600">
            Conecte suas contas através do navegador sem precisar de APIs
          </p>
        </div>
        <button
          onClick={scanBrowserConnections}
          disabled={isScanning}
          className="btn-primary flex items-center space-x-2"
        >
          {isScanning ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Escaneando...</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Escanear Navegador</span>
            </>
          )}
        </button>
      </div>

      {/* Browser Connections */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Conexões Detectadas
        </h3>
        
        {browserConnections.length === 0 ? (
          <div className="text-center py-8">
            <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhuma conexão detectada</p>
            <p className="text-sm text-gray-500 mt-1">
              Abra suas redes sociais no navegador e clique em "Escanear Navegador"
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {browserConnections.map((connection) => (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getPlatformIcon(connection.platform)}
                  <div>
                    <p className="font-medium text-gray-900">{connection.name}</p>
                    <p className="text-sm text-gray-500">{connection.userAgent}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(connection.status)}
                    <span className="text-sm text-gray-600">{connection.lastActivity}</span>
                  </div>
                  
                  {connection.status === 'connected' && (
                    <button
                      onClick={() => connectAccount(connection)}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      Conectar
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Connected Accounts */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Contas Conectadas
        </h3>
        
        {accounts.length === 0 ? (
          <div className="text-center py-8">
            <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Nenhuma conta conectada</p>
            <p className="text-sm text-gray-500 mt-1">
              Conecte suas contas para começar a postar
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {accounts.map((account) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
              >
                <div className="flex items-center space-x-3">
                  {getPlatformIcon(account.platform)}
                  <div>
                    <p className="font-medium text-gray-900">{account.displayName}</p>
                    <p className="text-sm text-gray-500">@{account.username}</p>
                    <p className="text-xs text-green-600">
                      Conectado via navegador • {account.lastSync}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">Ativo</span>
                  </div>
                  
                  <button
                    onClick={() => disconnectAccount(account.id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Desconectar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Como Funciona
        </h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>1. Abra suas redes sociais no navegador (TikTok, Instagram, YouTube)</p>
          <p>2. Faça login nas suas contas</p>
          <p>3. Volte para o Clipeiro e clique em "Escanear Navegador"</p>
          <p>4. Conecte as contas detectadas</p>
          <p>5. Agora você pode postar diretamente através do navegador!</p>
        </div>
      </div>
    </div>
  )
}

