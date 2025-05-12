import { IncomingMessage, ServerResponse } from 'http';
import { userRoutes } from './users/controller';

export const app = (req: IncomingMessage, res: ServerResponse) => {
    console.log(
        `[Worker ${process.pid}] Received ${req.method} ${req.url} on port ${req.socket.localPort}`
    );

    const { url, method } = req;

    if (url?.startsWith('/api/users')) {
        userRoutes(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not found' }));
    }
};
