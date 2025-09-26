// 📊 MÉTRICAS EXCEPCIONAIS
import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'
import { logger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const metrics = {
      timestamp: new Date().toISOString(),
      application: {
        name: 'Clipeiro AI',
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV,
        uptime: process.uptime()
      },
      system: {
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          external: Math.round(process.memoryUsage().external / 1024 / 1024),
          rss: Math.round(process.memoryUsage().rss / 1024 / 1024)
        },
        cpu: process.cpuUsage(),
        platform: process.platform,
        nodeVersion: process.version,
        pid: process.pid
      },
      redis: await getRedisMetrics(),
      requests: await getRequestMetrics()
    }

    return NextResponse.json(metrics)

  } catch (error) {
    logger.error('Metrics Error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    })

    return NextResponse.json({
      error: 'Failed to get metrics',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// 🔄 REDIS METRICS
async function getRedisMetrics() {
  try {
    const info = await redis.info('memory')
    const dbSize = await redis.dbsize()
    
    return {
      status: 'connected',
      dbSize,
      memory: info,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    return {
      status: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }
  }
}

// 📊 REQUEST METRICS
async function getRequestMetrics() {
  try {
    // Implementar métricas de requests aqui
    return {
      total: 0,
      success: 0,
      errors: 0,
      averageResponseTime: 0
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
