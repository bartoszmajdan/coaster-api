import Redis from 'ioredis';
import Redlock, { ResourceLockedError } from 'redlock';

import logger from './logger';

let redis: Redis | null = null;
let redlock: Redlock | null = null;

const initRedlockInstance = () =>
    new Promise((resolve, reject) => {
        const host = process.env.REDIS_HOST;
        const port = parseInt(process.env.REDIS_PORT || '', 10);

        if (!host || !port) {
            reject('Redis host or port not found');
            return;
        }

        redis = new Redis({ host, port });

        redis.on('connect', () => {
            logger.info('Redlock Redis connected');
            resolve(true);
        });

        redis.on('error', (err) => {
            logger.error('Redlock Redis error', err);
            reject(err);
        });

        redlock = new Redlock([redis], {
            retryCount: 10,
            retryDelay: 200,
            retryJitter: 200,
        });

        redlock.on('error', (err) => {
            if (err instanceof ResourceLockedError) {
                return;
            }

            logger.error('Redlock error', err);
        });
    });

const getRedlockInstance = (): {
    redis: Redis | null;
    redlock: Redlock | null;
} => ({
    redis,
    redlock,
});

export { getRedlockInstance };
export default initRedlockInstance;
