import rateLimit, { Options } from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { redisClient } from "../config/redis.config";

// Default rate limit configuration
const defaultOptions: Partial<Options> = {
    windowMs: 60 * 1000, // 1 minute
    max: 100, //  100 requests per windowMs
    message: "Too many requests, please try again later.",
    legacyHeaders: false,
    standardHeaders: true,
};

// Middleware for rate limiting with default options and customizable overrides
export const rateLimiter = (customOptions?: Partial<Options>) => {
    const options = {
        ...defaultOptions,
        ...customOptions,
    };

    const store = redisClient
        ? new RedisStore({
            sendCommand: async (command: string, ...args: (string | number | Buffer)[]) => {
                return redisClient!.call(command, ...args) as Promise<any>;
            },
        })
        : undefined;

    return rateLimit({
        ...options,
        store,
    });
};

// example usage in specific routes
// app.use("/auth", rateLimiter({ max: 10, windowMs: 60 * 1000 }));