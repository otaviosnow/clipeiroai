// 🔄 REDIS & BULLMQ CONFIGURATION
const { Queue, Worker } = require('bullmq');
const Redis = require('redis');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Redis Client
const redisClient = Redis.createClient({
  url: REDIS_URL
});

redisClient.on('error', (err) => {
  console.error('❌ Redis erro:', err);
});

redisClient.on('connect', () => {
  console.log('✅ Redis conectado!');
});

// BullMQ Connection
const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
};

// 📋 Filas
const queues = {
  clips: new Queue('clip-generation', { connection }),
  posts: new Queue('tiktok-posts', { connection })
};

// 📊 Add job to queue
const addClipJob = async (data) => {
  return await queues.clips.add('generate-clips', data, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
};

const addPostJob = async (data) => {
  return await queues.posts.add('publish-tiktok', data, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000
    }
  });
};

module.exports = {
  redisClient,
  connection,
  queues,
  addClipJob,
  addPostJob
};
