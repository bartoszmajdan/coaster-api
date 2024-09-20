import winston from 'winston';
import { join } from 'path';

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`,
        ),
    ),
    transports: [
        new winston.transports.File({
            filename: join(__dirname, '../', 'logs', 'error.log'),
            level: 'error',
        }),
        new winston.transports.File({
            filename: join(__dirname, '../', 'logs', 'warn.log'),
            level: 'warn',
        }),
        new winston.transports.File({
            filename: join(__dirname, '../', 'logs', 'info.log'),
            level: 'info',
        }),
        new winston.transports.Console(),
    ],
});

export default logger;
