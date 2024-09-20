import { NextFunction, Request, Response } from 'express';
import { matchedData, ValidationChain, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

const validationMiddleware = (schema: ValidationChain[]) => {
    return [
        ...schema,
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(StatusCodes.BAD_REQUEST).json(errors.mapped());
            }

            req.body = matchedData(req);
            next();
        },
    ];
};

export default validationMiddleware;
