import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import Coaster from '../../models/Coaster';

const createCoasterHandler = async (req: Request, res: Response) => {
    const coaster = new Coaster({
        id: uuidv4(),
        staffCount: req.body.staffCount,
        clientsCount: req.body.clientsCount,
        routeLength: req.body.routeLength,
        openingHour: req.body.openingHour,
        closingHour: req.body.closingHour,
        wagons: [],
    });

    const saveResult = await coaster.save();
    if (saveResult) {
        return res.status(StatusCodes.CREATED).send({
            id: coaster.id,
        });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
};

export default createCoasterHandler;
