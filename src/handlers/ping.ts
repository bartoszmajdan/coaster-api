import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const pingHandler = (req: Request, res: Response) => res.status(StatusCodes.OK).send('pong');

export default pingHandler;
