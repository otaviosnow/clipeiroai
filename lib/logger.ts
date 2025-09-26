// 📊 SISTEMA DE LOGS EXCEPCIONAL
import winston from 'winston'
import path from 'path'

// 🎯 CONFIGURAÇÃO DE LOGS
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint()
)

// 🎯 TRANSPORTS CONFIGURADOS
const transports = [
  // 📄 FILE TRANSPORT - ERROR
  new winston.transports.File({
    filename: path.join(process.cwd(), 'logs', 'error.log'),
    level: 'error',
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: logFormat
  }),
  
  // 📄 FILE TRANSPORT - COMBINED
  new winston.transports.File({
    filename: path.join(process.cwd(), 'logs', 'combined.log'),
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: logFormat
  }),
  
  // 🎯 CONSOLE TRANSPORT
  new winston.transports.Console({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  })
]

// 🚀 LOGGER PRINCIPAL
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports,
  exitOnError: false
})

// 🎯 LOGGER ESPECIALIZADO
export class AppLogger {
  // 📊 REQUEST LOGGER
  static logRequest(req: any, res: any, next: any) {
    const start = Date.now()
    
    res.on('finish', () => {
      const duration = Date.now() - start
      logger.info('HTTP Request', {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      })
    })
    
    next()
  }

  // 🔐 AUTH LOGGER
  static logAuth(action: string, userId?: string, email?: string, success: boolean = true) {
    logger.info('Authentication Event', {
      action,
      userId,
      email,
      success,
      timestamp: new Date().toISOString()
    })
  }

  // 🗄️ DATABASE LOGGER
  static logDatabase(operation: string, collection: string, duration: number, success: boolean = true) {
    logger.info('Database Operation', {
      operation,
      collection,
      duration: `${duration}ms`,
      success,
      timestamp: new Date().toISOString()
    })
  }

  // 🎯 BUSINESS LOGGER
  static logBusiness(event: string, data: any) {
    logger.info('Business Event', {
      event,
      data,
      timestamp: new Date().toISOString()
    })
  }

  // ❌ ERROR LOGGER
  static logError(error: Error, context?: any) {
    logger.error('Application Error', {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString()
    })
  }

  // 📊 PERFORMANCE LOGGER
  static logPerformance(operation: string, duration: number, metadata?: any) {
    logger.info('Performance Metric', {
      operation,
      duration: `${duration}ms`,
      metadata,
      timestamp: new Date().toISOString()
    })
  }
}

// 🎯 MIDDLEWARE DE LOGGING
export const loggingMiddleware = (req: any, res: any, next: any) => {
  AppLogger.logRequest(req, res, next)
}

export default logger
