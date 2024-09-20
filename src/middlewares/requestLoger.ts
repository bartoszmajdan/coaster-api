import { NextFunction, Request, Response } from 'express';

import logger from '../providers/logger';

export default () => (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const method = req.method;
        const status = res.statusCode;
        const path = req.originalUrl.split('?')[0];
        const duration = Date.now() - startTime;

        const logMessage = `${method} ${path} ${status} ${duration}ms`;

        if (status >= 500) {
            logger.error(logMessage);
        } else if (status >= 400) {
            logger.warn(logMessage);
        } else {
            logger.info(logMessage);
        }
    });

    next();
};
