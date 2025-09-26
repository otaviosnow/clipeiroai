import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://clipeiroai:otaviosnow2012@cluster0.0afjdgs.mongodb.net/clipeiro?retryWrites=true&w=majority&appName=Cluster0'

if (!process.env.MONGODB_URI) {
  console.warn('⚠️ MONGODB_URI não definida nas variáveis de ambiente')
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached!.conn) {
    return cached!.conn
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully')
      return mongoose
    })
  }

  try {
    cached!.conn = await cached!.promise
  } catch (e) {
    cached!.promise = null
    throw e
  }

  return cached!.conn
}

export default connectDB
export { connectDB }
