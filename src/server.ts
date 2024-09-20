import dotenv from 'dotenv';
dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
});

import logger from './providers/logger';
import expressSetup from './providers/express';

(() => {
    const application = expressSetup();
    const port = process.env.PORT || 3000;

    application.listen(port, () => {
        logger.info(`Server listening on port ${port}`);
    });
})();
