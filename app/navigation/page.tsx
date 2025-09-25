'use client'

import { motion } from 'framer-motion'
import { 
  Play, 
  BarChart3, 
  Scissors, 
  Sparkles, 
  Plus, 
  User,
  Instagram,
  Music,
  Youtube,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
  Users,
  ArrowRight,
  CheckCircle,
  Bot,
  TestTube
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NavigationPage() {
  const router = useRouter()

  const steps = [
    {
      id: 1,
      title: 'Conectar Contas',
      description: 'Conecte suas contas principais do Instagram e TikTok',
      route: '/connect-accounts',
      icon: <Users className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-500'
    },
    {
      id: 2,
      title: 'Criar Perfis',
      description: 'Deixe a AI criar perfis baseados na sua conta principal',
      route: '/connect-accounts',
      icon: <User className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'Upload Vídeo',
      description: 'Faça upload do seu vídeo e escolha os formatos',
      route: '/upload-video',
      icon: <Scissors className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Analytics',
      description: 'Acompanhe o sucesso dos seus clipes',
      route: '/analytics',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      title: 'Dashboard Principal',
      description: 'Veja métricas da sua conta principal',
      route: '/main-account-metrics',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 6,
      title: 'Dashboard Completo',
      description: 'Dashboard principal com todas as métricas',
      route: '/dashboard-dark',
      icon: <Play className="w-6 h-6" />,
      color: 'from-green-400 to-blue-500'
    },
    {
      id: 7,
      title: 'Automação Inteligente',
      description: 'Sistema de automação real com criação de contas',
      route: '/automation',
      icon: <Bot className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 8,
      title: 'Modo de Teste',
      description: 'Teste o sistema sem login real - 100% seguro',
      route: '/test-automation',
      icon: <TestTube className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Clipeiro</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors">
              <Instagram className="w-4 h-4" />
              <span>Conectar Instagram</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors">
              <Music className="w-4 h-4" />
              <span>Conectar TikTok</span>
            </button>
            
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
              Upgrade
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Sistema Clipeiro</h1>
            <p className="text-xl text-gray-300 mb-2">
              Plataforma completa para criação e gestão de clipes
            </p>
            <p className="text-gray-400">
              Siga os passos para configurar e usar o sistema
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 group cursor-pointer"
                onClick={() => router.push(step.route)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center text-white`}>
                    {step.icon}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Passo {step.id}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 mb-4">{step.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-400 font-medium">Acessar</span>
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-center">Estatísticas do Sistema</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">240</div>
                <div className="text-gray-400">Clipes Gerados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">24</div>
                <div className="text-gray-400">Vídeos Processados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">12</div>
                <div className="text-gray-400">Posts Agendados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">8</div>
                <div className="text-gray-400">Contas Conectadas</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Funcionalidades Principais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Geração Automática</h3>
                </div>
                <p className="text-gray-400">
                  Crie automaticamente 10 formatos diferentes do seu vídeo original, 
                  cada um otimizado para diferentes plataformas e estilos.
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Gestão de Contas</h3>
                </div>
                <p className="text-gray-400">
                  Conecte até 10 contas de cada plataforma e gerencie todas elas 
                  a partir de uma conta principal.
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Analytics Avançado</h3>
                </div>
                <p className="text-gray-400">
                  Acompanhe métricas detalhadas de performance, engajamento 
                  e crescimento de todas as suas contas.
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Postagem Automática</h3>
                </div>
                <p className="text-gray-400">
                  Agende e publique automaticamente seus clipes em todas as 
                  plataformas conectadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
