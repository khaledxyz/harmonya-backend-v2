import Redis from "ioredis";

let redisClient: Redis | null = null;

if (process.env.REDIS_URL) {
    redisClient = new Redis(process.env.REDIS_URL);
    console.log("Connected to Redis.");
} else {
    console.log("No REDIS_URL found. Using in-memory store.");
}

export { redisClient };