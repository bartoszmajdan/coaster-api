import { Redis } from 'ioredis';
import initRedisInstance from './redis';

import getEnvioroment from '../utils/getEnvioroment';
import { MESSAGE_TYPES } from '../constants/messages';
import Coaster from '../models/Coaster';
import logger from './logger';

let publisherInstance: Redis;
let subscriberInstance: Redis;

const receiveMessage = async (message: string) => {
    const { data, action } = JSON.parse(message) as { data: object; action: MESSAGE_TYPES };

    switch (action) {
        case MESSAGE_TYPES.CREATE_COASTER:
        case MESSAGE_TYPES.UPDATE_COASTER: {
            const coaster = new Coaster(data as Coaster);
            await coaster.save();
            break;
        }
        default:
            logger.warn(`Received unknown message: ${action}`);
            break;
    }
};

const publishMessage = async ({
    data,
    action,
}: {
    data: object;
    action: MESSAGE_TYPES;
}): Promise<void> => {
    if (!publisherInstance) {
        publisherInstance = await initRedisInstance();
    }

    const channelName = getChannelName();
    await publisherInstance.publish(channelName, JSON.stringify({ data, action }));
};

const initSynchronizer = async () => {
    if (!subscriberInstance) {
        subscriberInstance = await initRedisInstance();
    }

    return new Promise((resolve, reject) => {
        const channelName = getChannelName();
        subscriberInstance.on('message', (channel, message) => {
            if (channel === channelName) {
                receiveMessage(message);
            }
        });

        subscriberInstance.subscribe(channelName, (err) => {
            if (err) {
                reject(err);
            }

            resolve(true);
        });
    });
};

const getChannelName = () => [getEnvioroment(), 'coaster-api', 'synchronizer'].join(':');

export { publishMessage };
export default initSynchronizer;
