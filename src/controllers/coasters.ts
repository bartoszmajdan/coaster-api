import express from 'express';

import validationFields from '../constants/validationFields';
import validationMiddleware from '../middlewares/validation';

import createCoasterHandler from '../handlers/coasters/createCoaster';
import updateCoasterHandler from '../handlers/coasters/updateCoaster';
import createCoasterWagonHandler from '../handlers/coasters/createCoasterWagon';
import deleteCoasterWagonHandler from '../handlers/coasters/deleteCoasterWagon';

const router = express.Router();

router.post(
    '/',
    validationMiddleware([
        validationFields.staffCount,
        validationFields.clientsCount,
        validationFields.routeLength,
        validationFields.openingHour,
        validationFields.closingHour,
    ]),
    createCoasterHandler,
);

router.put(
    '/:coasterId',
    validationMiddleware([
        validationFields.staffCount,
        validationFields.clientsCount,
        validationFields.openingHour,
        validationFields.closingHour,
    ]),
    updateCoasterHandler,
);

router.post(
    '/:coasterId/wagons',
    validationMiddleware([validationFields.seatCount, validationFields.wagonSpeed]),
    createCoasterWagonHandler,
);

router.delete('/:coasterId/wagons/:wagonId', deleteCoasterWagonHandler);

export default router;
