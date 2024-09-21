import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import Coaster from '../../models/Coaster';
import { loadModel } from '../../providers/database';

const updateCoasterHandler = async (req: Request, res: Response) => {
    const modelData = await loadModel('Coaster', req.params.coasterId);
    if (!modelData) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }

    const coaster = new Coaster(modelData.data as Coaster);

    const saveResult = await coaster.updateCoaster({
        staffCount: req.body.staffCount,
        clientsCount: req.body.clientsCount,
        openingHour: req.body.openingHour,
        closingHour: req.body.closingHour,
    });

    if (saveResult) {
        return res.status(StatusCodes.OK).send(ReasonPhrases.OK);
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
};

export default updateCoasterHandler;
