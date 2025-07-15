const redis = require("redis");
const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

const TTL = 3600; // Default TTL for cache in seconds
client.connect();

async function getCache(key) {
  const value = await client.get(key);
  return value ? JSON.parse(value) : null;
}

async function setCache(key, value, ttl = TTL) {
  await client.set(key, JSON.stringify(value), { EX: ttl });
}

async function cacheOrFetch(key, fetchFn, ttl = TTL) {
  const cached = await getCache(key);
  if (cached) return cached;
  const data = await fetchFn();
  await setCache(key, data, ttl);
  return data;
}

module.exports = { getCache, setCache, cacheOrFetch };
