import { Lock } from 'redlock';

import logger from './logger';

import getEnvioroment from '../utils/getEnvioroment';
import initRedlockInstance, { getRedlockInstance } from './redlock';

let lock: Lock;
let isMaster = false;
let renewInterval: NodeJS.Timeout;

const LOCK_TTL = 10000;
const RENEW_INTERVAL = 5000;
const LOCK_KEY = [getEnvioroment(), 'coaster-api', 'master-lock'].join(':');

async function masterLock() {
    const { redlock } = getRedlockInstance();

    if (!redlock) {
        throw new Error('Redlock not initialized');
    }

    try {
        lock = await redlock.acquire([LOCK_KEY], LOCK_TTL);
        isMaster = true;
        logger.info('Master acquired');

        renewInterval = setInterval(async () => {
            try {
                lock = await lock.extend(LOCK_TTL);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                clearInterval(renewInterval);
                isMaster = false;
                masterLock();
            }
        }, RENEW_INTERVAL);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (ex) {
        isMaster = false;
        setTimeout(masterLock, 2000);
    }
}

async function acquireMasterLock() {
    await initRedlockInstance();
    await masterLock();
}

const checkIsMaster = () => isMaster;
const getRenewInterval = () => renewInterval;

process.on('SIGINT', async () => {
    const isMaster = checkIsMaster();
    const renewInterval = getRenewInterval();
    const { redis } = getRedlockInstance();

    if (redis && isMaster && renewInterval) {
        clearInterval(renewInterval);
        await redis.del(LOCK_KEY);
    }

    process.exit(0);
});

export default acquireMasterLock;
export { checkIsMaster, getRenewInterval };
