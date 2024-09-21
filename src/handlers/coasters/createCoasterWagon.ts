import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { MESSAGE_TYPES } from '../../constants/messages';

import Wagon from '../../models/Wagon';
import Coaster from '../../models/Coaster';
import { loadModel } from '../../providers/database';
import { publishMessage } from '../../providers/synchronizer';

const createCoasterWagonHandler = async (req: Request, res: Response) => {
    const modelData = await loadModel('Coaster', req.params.coasterId);
    if (!modelData) {
        return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }

    const coaster = new Coaster(modelData.data as Coaster);
    const wagon = new Wagon({
        id: uuidv4(),
        speed: req.body.wagonSpeed,
        seatsCount: req.body.seatsCount,
    });

    const saveResult = await coaster.addWagon(wagon);
    if (saveResult) {
        await publishMessage({
            data: coaster,
            action: MESSAGE_TYPES.UPDATE_COASTER,
        });
        return res.status(StatusCodes.CREATED).send({
            id: wagon.id,
        });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
};

export default createCoasterWagonHandler;
