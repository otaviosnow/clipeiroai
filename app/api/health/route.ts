// 🏥 HEALTH CHECK EXCEPCIONAL
import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { redis } from '@/lib/redis'
import { logger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV,
    services: {} as any
  }

  try {
    // 🗄️ MONGODB HEALTH CHECK
    try {
      const mongoStart = Date.now()
      await connectDB()
      healthCheck.services.mongodb = {
        status: 'healthy',
        responseTime: `${Date.now() - mongoStart}ms`,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      healthCheck.services.mongodb = {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }
      healthCheck.status = 'degraded'
    }

    // 🔄 REDIS HEALTH CHECK
    try {
      const redisStart = Date.now()
      await redis.ping()
      healthCheck.services.redis = {
        status: 'healthy',
        responseTime: `${Date.now() - redisStart}ms`,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      healthCheck.services.redis = {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }
      healthCheck.status = 'degraded'
    }

    // 📊 SYSTEM METRICS
    healthCheck.services.system = {
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024)
      },
      cpu: {
        usage: process.cpuUsage()
      },
      platform: process.platform,
      nodeVersion: process.version
    }

    // 🎯 RESPONSE TIME
    healthCheck.responseTime = `${Date.now() - startTime}ms`

    // 📊 LOG HEALTH CHECK
    logger.info('Health Check', {
      status: healthCheck.status,
      responseTime: healthCheck.responseTime,
      services: healthCheck.services
    })

    // 🎯 RETURN APPROPRIATE STATUS
    const statusCode = healthCheck.status === 'healthy' ? 200 : 503

    return NextResponse.json(healthCheck, { status: statusCode })

  } catch (error) {
    logger.error('Health Check Error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })

    return NextResponse.json({
      status: 'unhealthy',
      error: 'Health check failed',
      timestamp: new Date().toISOString()
    }, { status: 503 })
  }
}
