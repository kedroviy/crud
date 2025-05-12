import { IncomingMessage, ServerResponse } from 'http';
import { userRoutes } from './users/controller';

const PORT = process.env.PORT || 3000;

export const app = (req: IncomingMessage, res: ServerResponse) => {
    console.log(
        `[Worker ${process.pid}] Received ${req.method} ${req.url} on port ${req.socket.localPort}`
    );

    const { url, method } = req;

    console.log(`Request received: ${method} ${url}`);

    if (url?.startsWith('/api/users')) {
        userRoutes(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not found' }));
    }
};
