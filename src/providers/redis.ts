import Redis from 'ioredis';
import logger from './logger';

const initRedisInstance = (): Promise<Redis> =>
    new Promise((resolve, reject) => {
        const host = process.env.REDIS_HOST;
        const port = parseInt(process.env.REDIS_PORT || '', 10);

        if (!host || !port) {
            reject('Redis host or port not found');
            return;
        }

        const redis = new Redis({ host, port });

        redis.on('connect', () => {
            logger.info('Redis connected');
            resolve(redis);
        });

        redis.on('error', (err) => {
            logger.error('Redis error', err);
            reject(err);
        });
    });

export default initRedisInstance;
