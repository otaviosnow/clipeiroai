'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Check, 
  X, 
  Crown, 
  Star, 
  Zap, 
  Shield, 
  Globe, 
  Brain,
  TrendingUp,
  Target,
  Users,
  BarChart3,
  Sparkles,
  ArrowRight,
  Lock,
  Unlock,
  CreditCard,
  DollarSign
} from 'lucide-react'
import toast from 'react-hot-toast'

interface Plan {
  id: string
  name: string
  price: number
  period: 'monthly' | 'yearly'
  description: string
  features: string[]
  limitations: string[]
  color: string
  icon: React.ReactNode
  popular?: boolean
  viralAnalysis?: boolean
}

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Básico',
      price: 0,
      period: 'monthly',
      description: 'Perfeito para começar',
      features: [
        'Até 5 clipes por vídeo',
        '3 estilos de clipe',
        '1 conta principal',
        'Analytics básicos',
        'Suporte por email'
      ],
      limitations: [
        'Sem automação',
        'Sem análise viral',
        'Sem templates personalizados'
      ],
      color: 'gray',
      icon: <Target className="w-6 h-6" />
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 97,
      period: 'monthly',
      description: 'Para criadores sérios',
      features: [
        'Até 10 clipes por vídeo',
        '10 estilos de clipe',
        '3 contas principais',
        'Automação básica',
        'Analytics avançados',
        'Templates personalizados',
        'Suporte prioritário'
      ],
      limitations: [
        'Sem análise viral dos EUA',
        'Limite de 50 vídeos/mês'
      ],
      color: 'blue',
      icon: <Star className="w-6 h-6" />
    },
    {
      id: 'viral',
      name: 'Viral Analysis',
      price: 197,
      period: 'monthly',
      description: 'Análise viral dos EUA',
      features: [
        'Tudo do plano Pro',
        'Análise viral dos EUA',
        'IA conectada aos EUA',
        'Rastreamento de tendências',
        'Insights de nicho',
        'Hashtags virais',
        'Horários de pico',
        'Conteúdo trending',
        'Suporte VIP'
      ],
      limitations: [],
      color: 'red',
      icon: <Crown className="w-6 h-6" />,
      popular: true,
      viralAnalysis: true
    }
  ]

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleSubscribe = (plan: Plan) => {
    if (plan.id === 'basic') {
      toast.success('Plano básico ativado!')
      return
    }

    // Simular processo de pagamento
    toast.loading('Processando pagamento...', { duration: 2000 })
    
    setTimeout(() => {
      toast.success(`Plano ${plan.name} ativado com sucesso!`)
      if (plan.viralAnalysis) {
        toast.success('Acesso à análise viral dos EUA liberado!', { duration: 5000 })
      }
    }, 2000)
  }

  const getPlanColor = (color: string) => {
    switch (color) {
      case 'gray': return 'border-gray-500'
      case 'blue': return 'border-blue-500'
      case 'red': return 'border-red-500'
      default: return 'border-gray-500'
    }
  }

  const getPlanBgColor = (color: string) => {
    switch (color) {
      case 'gray': return 'bg-gray-500'
      case 'blue': return 'bg-blue-500'
      case 'red': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getPlanTextColor = (color: string) => {
    switch (color) {
      case 'gray': return 'text-gray-500'
      case 'blue': return 'text-blue-500'
      case 'red': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">
            Escolha seu Plano
          </h1>
          <p className="text-gray-300 text-lg">
            Desbloqueie o poder da automação e análise viral
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-3 rounded-lg transition-colors ${
                billingPeriod === 'yearly'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Anual (2 meses grátis)
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-xl border-2 transition-all duration-300 ${
                selectedPlan === plan.id
                  ? `${getPlanColor(plan.color)} bg-opacity-10`
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              } ${plan.popular ? 'ring-2 ring-red-500 ring-opacity-50' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Crown className="w-4 h-4" />
                    <span>Mais Popular</span>
                  </div>
                </div>
              )}

              {/* Viral Analysis Badge */}
              {plan.viralAnalysis && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Globe className="w-3 h-3" />
                    <span>EUA</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 ${getPlanBgColor(plan.color)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold">
                      {plan.price === 0 ? 'Grátis' : `R$ ${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-400">/mês</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-gray-500 line-through">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* Subscribe Button */}
                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.id === 'basic'
                      ? 'bg-gray-600 hover:bg-gray-700 text-white'
                      : plan.id === 'pro'
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {plan.id === 'basic' ? 'Ativar Grátis' : 'Assinar Agora'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Viral Analysis Features */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Análise Viral dos EUA</h3>
            <p className="text-gray-400">Exclusivo do plano Viral Analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium mb-2">Rastreamento em Tempo Real</h4>
              <p className="text-sm text-gray-400">IA conectada aos EUA monitora tendências 24/7</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium mb-2">Análise por Nicho</h4>
              <p className="text-sm text-gray-400">Conteúdo viral segmentado por categoria</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium mb-2">Insights Inteligentes</h4>
              <p className="text-sm text-gray-400">Hashtags, horários e formatos virais</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-medium mb-2">Métricas Avançadas</h4>
              <p className="text-sm text-gray-400">Scores de viralidade e engajamento</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Como funciona a análise viral dos EUA?</h4>
              <p className="text-gray-400">
                Nossa IA está conectada a contas dos EUA e monitora conteúdo viral em tempo real, 
                analisando engajamento, tendências e padrões de sucesso.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Posso cancelar a qualquer momento?</h4>
              <p className="text-gray-400">
                Sim, você pode cancelar sua assinatura a qualquer momento. Não há taxas de cancelamento.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Os dados são seguros?</h4>
              <p className="text-gray-400">
                Absolutamente. Todos os dados são criptografados e protegidos com as melhores práticas de segurança.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Posso mudar de plano depois?</h4>
              <p className="text-gray-400">
                Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

