import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { OnboardingData } from '@/models/OnboardingData'

export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { userId, socialUsernames } = body

    console.log('📝 Updating onboarding data:', { userId, socialUsernames })

    // Atualizar os usernames das redes sociais
    const socialProfiles = Object.entries(socialUsernames)
      .filter(([_, username]) => username && typeof username === 'string' && username.trim())
      .map(([platform, username]) => ({
        platform,
        username: (username as string).trim(),
        originalUsername: (username as string).trim(),
        isActive: true,
        createdAt: new Date()
      }))

    // Criar contas de clipes baseadas nos usernames finais
    const clipAccounts = Object.entries(socialUsernames)
      .filter(([_, username]) => username && typeof username === 'string' && username.trim())
      .map(([platform, username]) => ({
        platform,
        username: `${(username as string).trim()}_clips`,
        status: 'pending',
        originalProfile: (username as string).trim()
      }))

    const updatedData = await OnboardingData.findOneAndUpdate(
      { userId },
      {
        socialProfiles,
        clipAccounts,
        status: 'processing',
        updatedAt: new Date()
      },
      { new: true }
    )

    if (!updatedData) {
      return NextResponse.json(
        { success: false, message: 'Dados do onboarding não encontrados' },
        { status: 404 }
      )
    }

    console.log('✅ Onboarding data updated successfully')

    // Simular criação das contas de clipes
    setTimeout(async () => {
      try {
        await OnboardingData.findByIdAndUpdate(updatedData._id, {
          status: 'completed',
          'clipAccounts.$[].status': 'created'
        })
        console.log('✅ Clip accounts created successfully')
      } catch (error) {
        console.error('❌ Error updating clip accounts:', error)
      }
    }, 5000)

    return NextResponse.json({
      success: true,
      message: 'Dados do onboarding atualizados com sucesso',
      data: {
        id: updatedData._id,
        status: updatedData.status,
        clipAccounts: updatedData.clipAccounts
      }
    })

  } catch (error) {
    console.error('❌ Error updating onboarding data:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao atualizar dados do onboarding' },
      { status: 500 }
    )
  }
}
