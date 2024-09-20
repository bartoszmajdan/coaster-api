import server, { app } from './server';

jest.mock('express', () => {
    return () => ({
        listen: jest.fn().mockResolvedValue('listening'),
    });
});

describe('server', () => {
    beforeEach(() => {
        (app.listen as jest.Mock).mockResolvedValue('listening');
    });

    it('should export app', () => {
        expect(app).toBeDefined();
    });

    it('should export server', () => {
        expect(server).toBeDefined();
    });

    it('should call listen on app', async () => {
        await server();
        expect(app.listen).toHaveBeenCalled();
    });

    it('should log the port', async () => {
        console.log = jest.fn();
        await server();
        expect(console.log).toHaveBeenCalledWith('Server listening on port 3000');
    });

    it('should log the error', async () => {
        console.log = jest.fn();

        (app.listen as jest.Mock).mockRejectedValue(new Error('Mock error'));

        await server();
        expect(console.log).toHaveBeenCalledWith(new Error('Mock error'));
    });

    it('should listen on the port from the environment', async () => {
        process.env.PORT = '3001';
        console.log = jest.fn();
        await server();
        expect(console.log).toHaveBeenCalledWith('Server listening on port 3001');
    });
});
