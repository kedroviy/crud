import { IncomingMessage, ServerResponse } from 'http';
import { userRoutes } from './users/controller';

export const router = (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;

    if (url?.startsWith('/api/users')) {
        return userRoutes(req, res);
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found' }));
};
