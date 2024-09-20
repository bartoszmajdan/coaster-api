jest.mock('./providers/logger');
jest.mock('dotenv');
jest.mock('express', () => {
    return () => ({
        listen: jest.fn().mockResolvedValueOnce('mocked'),
    });
});

import initServer, { app } from './server.ts';
import logger from './providers/logger.ts';

describe('server', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should export express app', () => {
        expect(app).toBeDefined();
    });

    it('should export initServer function', () => {
        expect(initServer).toBeDefined();
    });

    it('should call listen on app', async () => {
        await initServer();
        expect(app.listen).toHaveBeenCalled();
    });

    it('should log the port', async () => {
        await initServer();
        expect(logger.info).toHaveBeenCalledWith('Server listening on port 3000');
    });

    it('should log the error', async () => {
        (app.listen as jest.Mock).mockRejectedValueOnce(new Error('Mock error'));

        await initServer();
        expect(logger.error).toHaveBeenCalledWith('Error starting server', new Error('Mock error'));
    });

    it('should listen on the port from the environment', async () => {
        process.env.PORT = '3001';
        await initServer();
        expect(logger.info).toHaveBeenCalledWith('Server listening on port 3001');
    });
});
