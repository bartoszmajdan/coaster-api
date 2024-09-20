import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import pingController from '../controllers/ping';
import coastersController from '../controllers/coasters';

export default () => {
    const router = express.Router();

    router.use('/ping', pingController);
    router.use('/api/coasters', coastersController);
    router.use((req, res) => res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND));

    return router;
};
