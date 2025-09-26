// 🔄 REDIS CONFIGURAÇÃO EXCEPCIONAL
import Redis from 'ioredis'

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || 'clipeiro2024'

// 🚀 CONFIGURAÇÃO REDIS OTIMIZADA
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  keepAlive: 30000,
  connectTimeout: 10000,
  commandTimeout: 5000,
  retryDelayOnClusterDown: 300,
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
}

// 🎯 CLIENTE REDIS PRINCIPAL
export const redis = new Redis(REDIS_URL, redisConfig)

// 🎯 CLIENTE REDIS PARA PUBLISH/SUBSCRIBE
export const redisPub = new Redis(REDIS_URL, redisConfig)
export const redisSub = new Redis(REDIS_URL, redisConfig)

// 🔧 CONFIGURAÇÃO DE EVENTOS
redis.on('connect', () => {
  console.log('✅ Redis connected successfully')
})

redis.on('error', (error) => {
  console.error('❌ Redis connection error:', error)
})

redis.on('ready', () => {
  console.log('🚀 Redis ready for operations')
})

// 🎯 FUNÇÕES DE CACHE AVANÇADAS
export class CacheManager {
  // 📊 CACHE COM TTL
  static async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    try {
      await redis.setex(key, ttl, JSON.stringify(value))
    } catch (error) {
      console.error('❌ Cache set error:', error)
    }
  }

  // 📊 CACHE GET
  static async get<T>(key: string): Promise<T | null> {
    try {
      const value = await redis.get(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('❌ Cache get error:', error)
      return null
    }
  }

  // 🗑️ CACHE DELETE
  static async delete(key: string): Promise<void> {
    try {
      await redis.del(key)
    } catch (error) {
      console.error('❌ Cache delete error:', error)
    }
  }

  // 🔄 CACHE INVALIDATE PATTERN
  static async invalidatePattern(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern)
      if (keys.length > 0) {
        await redis.del(...keys)
      }
    } catch (error) {
      console.error('❌ Cache invalidate pattern error:', error)
    }
  }

  // 📊 CACHE STATS
  static async getStats(): Promise<any> {
    try {
      const info = await redis.info('memory')
      const keyspace = await redis.info('keyspace')
      return { info, keyspace }
    } catch (error) {
      console.error('❌ Cache stats error:', error)
      return null
    }
  }
}

// 🎯 SESSÃO MANAGER
export class SessionManager {
  // 🔐 CREATE SESSION
  static async createSession(userId: string, data: any): Promise<string> {
    const sessionId = `session:${userId}:${Date.now()}`
    await redis.setex(sessionId, 86400, JSON.stringify(data)) // 24h
    return sessionId
  }

  // 🔐 GET SESSION
  static async getSession(sessionId: string): Promise<any> {
    return await CacheManager.get(sessionId)
  }

  // 🔐 UPDATE SESSION
  static async updateSession(sessionId: string, data: any): Promise<void> {
    await redis.setex(sessionId, 86400, JSON.stringify(data))
  }

  // 🔐 DELETE SESSION
  static async deleteSession(sessionId: string): Promise<void> {
    await CacheManager.delete(sessionId)
  }
}

// 🎯 RATE LIMITING
export class RateLimiter {
  // 🚦 CHECK RATE LIMIT
  static async checkLimit(key: string, limit: number, window: number): Promise<boolean> {
    try {
      const current = await redis.incr(key)
      if (current === 1) {
        await redis.expire(key, window)
      }
      return current <= limit
    } catch (error) {
      console.error('❌ Rate limit check error:', error)
      return true // Allow on error
    }
  }

  // 🚦 RESET RATE LIMIT
  static async resetLimit(key: string): Promise<void> {
    await redis.del(key)
  }
}

export default redis
