import { NextRequest, NextResponse } from 'next/server'
import { IntegratedAutomation } from '@/lib/automation/integrated-automation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { config } = body

    if (!config) {
      return NextResponse.json(
        { message: 'Configuração não fornecida' },
        { status: 400 }
      )
    }

    // Validar configuração
    if (!config.parentAccount?.username || !config.parentAccount?.password) {
      return NextResponse.json(
        { message: 'Dados da conta principal são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar instância da automação
    const automation = new IntegratedAutomation()

    try {
      // Executar automação
      const result = await automation.executeFullAutomation(config)

      // Limpar recursos
      await automation.cleanup()

      return NextResponse.json({
        success: true,
        result
      })

    } catch (error) {
      console.error('Erro na automação:', error)
      
      // Limpar recursos em caso de erro
      await automation.cleanup()

      return NextResponse.json({
        success: false,
        message: 'Erro na execução da automação',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Erro na API de automação:', error)
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'API de automação funcionando',
    endpoints: {
      POST: '/api/automation/execute - Executar automação',
      GET: '/api/automation/status - Status da automação'
    }
  })
}

