

import Redis from 'ioredis';

// Create a Redis client
const redis = new Redis({
  host: 'localhost',   // Redis server hostname (use 'localhost' if you're on the same machine)
  port: 6379,          // Default Redis port
  password: '',         // If you have a password set for Redis
  db: 0                 // Default Redis DB
});

// Function to store data in Redis cache
export const setCache = (key, value, expiration = 3600) => {
  redis.set(key, JSON.stringify(value), 'EX', expiration); // 'EX' sets expiration time in seconds (default: 1 hour)
};

// Function to get data from Redis cache
export const getCache = async (key) => {
  const result = await redis.get(key);
  return result ? JSON.parse(result) : null;
};

// Function to delete data from Redis cache
export const deleteCache = (key) => {
  redis.del(key);
};
