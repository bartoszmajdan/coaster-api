import dotenv from 'dotenv';
import getEnvioroment from './utils/getEnvioroment';

dotenv.config({
    path: `.env.${getEnvioroment()}`,
});

import logger from './providers/logger';
import expressSetup from './providers/express';
import CoasterManager from './providers/coaster';

(() => {
    const application = expressSetup();
    const port = process.env.PORT || 3000;
    const coasterManager = new CoasterManager();

    application.listen(port, () => {
        coasterManager.start();
        logger.info(`Server listening on port ${port}`);
    });
})();
