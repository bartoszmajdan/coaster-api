import dotenv from 'dotenv';
import getEnvioroment from './utils/getEnvioroment';

dotenv.config({
    path: `.env.${getEnvioroment()}`,
});

import logger from './providers/logger';
import expressSetup from './providers/express';
import CoasterManager from './providers/coaster';
import acquireMasterLock from './providers/master';
import initSynchronizer from './providers/synchronizer';

(async () => {
    const application = expressSetup();
    const port = process.env.PORT || 3000;
    const coasterManager = new CoasterManager();

    try {
        await initSynchronizer();
        await acquireMasterLock();
        await coasterManager.start();

        application.listen(port, () => {
            logger.info(`Server listening on port ${port}`);
        });
    } catch (ex) {
        logger.error(ex);
    }
})();
