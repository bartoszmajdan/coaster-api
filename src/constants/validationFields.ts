import { body } from 'express-validator';
import checkHoursAndMinutes from '../utils/checkHoursAndMinutes';
import checkOpeningAndClosingHours from '../utils/checkOpeningAndClosingHours';
import isPositiveNumber from '../utils/isPositiveNumber';

export default {
    staffCount: body('staffCount')
        .isNumeric()
        .custom((value) => isPositiveNumber(value))
        .withMessage('Staff count must be a positive number (including zero)'),
    clientsCount: body('clientsCount')
        .custom((value) => isPositiveNumber(value))
        .withMessage('Clients count must be a positive number (including zero)'),
    routeLength: body('routeLength')
        .custom((value) => isPositiveNumber(value))
        .withMessage('Route length must be a positive number (including zero)'),
    openingHour: body('openingHour')
        .isString()
        .withMessage('Opening hour must be a string')
        .custom((value) => checkHoursAndMinutes(value))
        .withMessage('Opening hour must be between 00:00 and 23:59')
        .custom((value, { req }) => checkOpeningAndClosingHours(value, req.body.closingHour))
        .withMessage('Opening hour must be before closing hour'),
    closingHour: body('closingHour')
        .isString()
        .withMessage('Closing hour must be a string')
        .custom((value) => checkHoursAndMinutes(value))
        .withMessage('Closing hour must be between 00:00 and 23:59'),
    seatCount: body('seatCount')
        .custom((value) => isPositiveNumber(value))
        .withMessage('Seat count must be a positive number (including zero)'),
    wagonSpeed: body('wagonSpeed')
        .custom((value) => isPositiveNumber(value))
        .withMessage('Wagon speed must be a positive number (including zero)'),
};
