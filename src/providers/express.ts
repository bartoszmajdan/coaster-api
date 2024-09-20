import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import requestLoger from '../middlewares/requestLoger';
import router from './router';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import logger from './logger';

export default () => {
    const app = express() as express.Application;

    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(requestLoger());

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
        const method = req.method;
        const path = req.originalUrl.split('?')[0];
        logger.error(`${method} ${path} ${err.message}`);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    });

    app.use(router());

    return app;
};
