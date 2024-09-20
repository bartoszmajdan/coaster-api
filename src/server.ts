import dotenv from 'dotenv';
import express from 'express';
import logger from './providers/logger.ts';

dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
});

const app = express();

const initServer = async () => {
    const port = process.env.PORT || 3000;

    try {
        await app.listen(port);
        logger.info(`Server listening on port ${port}`);
    } catch (ex) {
        logger.error('Error starting server', ex);
    }
};

initServer();

export default initServer;
export { app };
