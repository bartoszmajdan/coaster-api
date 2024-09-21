import winston from 'winston';
import { join } from 'path';
import { isProduction } from '../utils/getEnvioroment';

const logsDir = join(__dirname, '../../', 'logs');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`,
        ),
    ),
    transports: [
        new winston.transports.File({
            filename: join(logsDir, 'error.log'),
            level: 'error',
        }),
        new winston.transports.File({
            filename: join(logsDir, 'warn.log'),
            level: 'warn',
        }),
        new winston.transports.Console(),
    ],
});

if (!isProduction()) {
    logger.add(
        new winston.transports.File({
            filename: join(logsDir, 'info.log'),
            level: 'info',
        }),
    );
}

export default logger;
