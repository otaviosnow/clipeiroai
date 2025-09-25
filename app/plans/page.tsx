'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home, Check, Crown, Zap, Shield, Globe } from 'lucide-react'

export default function Plans() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState('premium')

  console.log('💳 Plans page rendered')

  const plans = [
    {
      id: 'free',
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      description: 'Para começar',
      features: [
        'Até 5 clipes por mês',
        'Análise básica',
        'Suporte por email',
        'Templates limitados'
      ],
      buttonText: 'Plano Atual',
      buttonStyle: 'bg-gray-600 text-white',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R$ 97',
      period: '/mês',
      description: 'Para criadores',
      features: [
        'Clipes ilimitados',
        'Análise viral EUA',
        'Automação completa',
        'Suporte prioritário',
        'Templates premium',
        'Analytics avançados'
      ],
      buttonText: 'Assinar Premium',
      buttonStyle: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'R$ 297',
      period: '/mês',
      description: 'Para agências',
      features: [
        'Tudo do Premium',
        'Múltiplas contas',
        'API personalizada',
        'Suporte dedicado',
        'Relatórios customizados',
        'Integração avançada'
      ],
      buttonText: 'Falar com Vendas',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
      popular: false
    }
  ]

  const handlePlanSelect = (planId: string) => {
    console.log('💳 Plan selected:', planId)
    setSelectedPlan(planId)
    
    if (planId === 'premium') {
      // Simulate premium subscription
      console.log('✅ Premium plan activated')
      router.push('/dashboard-dark')
    } else if (planId === 'enterprise') {
      // Simulate enterprise contact
      console.log('📞 Enterprise contact initiated')
      alert('Entre em contato conosco para mais informações sobre o plano Enterprise!')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard-dark')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <Crown className="w-6 h-6 text-yellow-500" />
                <span className="text-xl font-bold">Planos</span>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/dashboard-dark')}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Escolha seu Plano</h1>
          <p className="text-xl text-gray-400">
            Desbloqueie todo o potencial do ClipEiro AI
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gray-900/50 p-8 rounded-lg border transition-all duration-300 ${
                plan.popular
                  ? 'border-blue-500 ring-2 ring-blue-500/20'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Mais Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handlePlanSelect(plan.id)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${plan.buttonStyle} ${
                  plan.id === 'free' ? 'cursor-not-allowed' : 'hover:opacity-90'
                }`}
                disabled={plan.id === 'free'}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-16 bg-gray-900/50 p-8 rounded-lg border border-gray-800">
          <h3 className="text-2xl font-bold text-center mb-8">Comparação de Recursos</h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <Zap className="w-8 h-8 mx-auto mb-4 text-blue-500" />
              <h4 className="font-semibold mb-2">Automação</h4>
              <p className="text-sm text-gray-400">Criação automática de clipes</p>
            </div>
            
            <div className="text-center">
              <Globe className="w-8 h-8 mx-auto mb-4 text-purple-500" />
              <h4 className="font-semibold mb-2">Análise Viral EUA</h4>
              <p className="text-sm text-gray-400">Tendências em tempo real</p>
            </div>
            
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-4 text-green-500" />
              <h4 className="font-semibold mb-2">Segurança</h4>
              <p className="text-sm text-gray-400">Dados protegidos</p>
            </div>
            
            <div className="text-center">
              <Crown className="w-8 h-8 mx-auto mb-4 text-yellow-500" />
              <h4 className="font-semibold mb-2">Suporte</h4>
              <p className="text-sm text-gray-400">Atendimento prioritário</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
