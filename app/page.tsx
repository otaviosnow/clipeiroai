'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Play, Zap, Shield, Globe, Crown, DollarSign } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  console.log('🏠 Home page rendered')

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                ClipEiro AI
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/login')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg font-medium"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/register')}
                className="border-2 border-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 font-medium"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight">
              ClipEiro AI
            </h1>
            <p className="text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Sistema inteligente para criação automática de clipes virais. 
              <br />
              <span className="text-blue-400">Análise de tendências</span>, <span className="text-purple-400">automação completa</span> e <span className="text-pink-400">resultados garantidos</span>.
            </p>
          </div>
          
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <button
                  onClick={() => router.push('/register')}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
                >
                  Criar Conta
                </button>
              <button
                onClick={() => router.push('/login')}
                className="border-2 border-gray-600 text-white px-10 py-4 rounded-xl text-xl font-semibold hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 hover:scale-105"
              >
                Fazer Login
              </button>
            </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">10K+</div>
              <div className="text-gray-400">Clipes Criados</div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
              <div className="text-gray-400">Taxa de Sucesso</div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
              <div className="text-gray-400">Automação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Funcionalidades
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Tecnologia avançada para maximizar seu potencial criativo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">Análise Viral EUA</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Rastreamento de tendências em tempo real nos EUA com IA avançada</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-105">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">Automação Completa</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Criação e publicação automática de clipes em múltiplas plataformas</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:scale-105">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">Multi-plataforma</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Instagram, TikTok e YouTube integrados em uma única solução</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 hover:scale-105">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
                <Crown className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">IA Avançada</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Aprendizado contínuo e otimização baseada em dados reais</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:scale-105">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                <Play className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-white">Studio AI</h3>
              <p className="text-gray-400 leading-relaxed text-sm">Transforme vídeos longos em clips virais com inteligência artificial</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
