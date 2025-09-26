import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { OnboardingData } from '@/models/OnboardingData'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { userId, userEmail, objective, socialProfiles, productChoice } = body

    console.log('📝 Saving onboarding data:', { userId, userEmail, objective, socialProfiles, productChoice })

    // Criar contas de clipes baseadas nos perfis originais
    const clipAccounts = socialProfiles
      .filter((profile: any) => profile.username && typeof profile.username === 'string' && profile.username.trim())
      .map((profile: any) => ({
        platform: profile.platform,
        username: `${profile.username}_clips`,
        status: 'pending',
        originalProfile: profile.username
      }))

    const onboardingData = new OnboardingData({
      userId,
      userEmail,
      objective,
      socialProfiles: socialProfiles.map((profile: any) => ({
        platform: profile.platform,
        username: profile.username,
        originalUsername: profile.username,
        isActive: true,
        createdAt: new Date()
      })),
      productChoice,
      status: 'processing',
      clipAccounts
    })

    await onboardingData.save()

    console.log('✅ Onboarding data saved successfully')

    // Simular criação das contas de clipes
    setTimeout(async () => {
      try {
        await OnboardingData.findByIdAndUpdate(onboardingData._id, {
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
      message: 'Dados do onboarding salvos com sucesso',
      data: {
        id: onboardingData._id,
        status: onboardingData.status,
        clipAccounts: onboardingData.clipAccounts
      }
    })

  } catch (error) {
    console.error('❌ Error saving onboarding data:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao salvar dados do onboarding' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'userId é obrigatório' },
        { status: 400 }
      )
    }

    const onboardingData = await OnboardingData.findOne({ userId })

    if (!onboardingData) {
      return NextResponse.json(
        { success: false, message: 'Dados do onboarding não encontrados' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: onboardingData
    })

  } catch (error) {
    console.error('❌ Error fetching onboarding data:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao buscar dados do onboarding' },
      { status: 500 }
    )
  }
}
