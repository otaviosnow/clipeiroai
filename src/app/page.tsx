'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Zap, Users, BarChart3, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import TestLoginModal from '@/components/TestLoginModal'

export default function HomePage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [showTestLogin, setShowTestLogin] = useState(false)

  const handleTestLogin = (credentials: { username: string, password: string }) => {
    // Salvar credenciais no localStorage para simular login
    localStorage.setItem('testUser', JSON.stringify({
      username: credentials.username,
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    }))
    
    // Redirecionar para o dashboard após login
    window.location.href = '/dashboard-dark'
  }

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary-500" />,
      title: "10 Formatos Automáticos",
      description: "Transforme um vídeo em 10 clipes diferentes automaticamente"
    },
    {
      icon: <Users className="w-8 h-8 text-secondary-500" />,
      title: "Múltiplas Contas",
      description: "Conecte até 10 contas do TikTok, Instagram e YouTube"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-accent-500" />,
      title: "Alcance Máximo",
      description: "Poste simultaneamente em todas as plataformas"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center shadow-lg shadow-gray-500/20 border border-gray-500">
                <Play className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Clipeiro</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <button 
                onClick={() => setShowTestLogin(true)}
                className="text-gray-300 hover:text-white transition-all duration-300 font-medium"
              >
                Login Teste
              </button>
              <Link href="/register" className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-gray-500/20 hover:shadow-xl hover:shadow-gray-500/30 border border-gray-600">
                Começar Grátis
              </Link>
            </motion.div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Transforme seus{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">vídeos</span>
              <br />
              em clipes virais
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Suba um vídeo e receba 10 formatos diferentes automaticamente. 
              Poste em todas as suas contas do TikTok, Instagram e YouTube com um clique.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/navigation" className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white text-lg px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-gray-500/20 hover:shadow-xl hover:shadow-gray-500/30 inline-flex items-center border border-gray-600">
                Acessar Sistema
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link href="/register" className="bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-white text-lg px-8 py-4 rounded-xl font-medium transition-all duration-300 border border-gray-600 hover:border-gray-500">
                Criar Conta
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Video Demo */}
        {isVideoPlaying && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                  <p className="text-gray-600">Demonstração em breve</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Como funciona?
            </h2>
            <p className="text-xl text-gray-300">
              Simples, rápido e eficiente
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 text-center hover:bg-gray-700/30 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-500/10"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8 shadow-2xl shadow-gray-500/20 border border-gray-600"
          >
            <h2 className="text-4xl font-bold mb-4">
              Pronto para viralizar?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a milhares de criadores que já estão usando o Clipeiro
            </p>
            <Link href="/register" className="bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-600 hover:to-gray-700 font-semibold py-3 px-8 rounded-xl transition-all duration-300 inline-flex items-center shadow-lg shadow-gray-500/20 hover:shadow-xl hover:shadow-gray-500/30 border border-gray-600">
              Começar Grátis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 backdrop-blur-sm text-white py-12 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center shadow-lg shadow-gray-500/20 border border-gray-500">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Clipeiro</span>
            </div>
            <p className="text-gray-400">
              © 2024 Clipeiro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Test Login Modal */}
      <TestLoginModal
        isOpen={showTestLogin}
        onClose={() => setShowTestLogin(false)}
        onLogin={handleTestLogin}
      />
    </div>
  )
}
