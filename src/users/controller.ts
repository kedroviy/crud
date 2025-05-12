import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { getUser, listUsers, createUser, updateUser, deleteUser } from './service';
import { getRequestBody } from '../utils/getRequestBody';
import { idMatch } from '../utils/isMatch';

export const userRoutes = async (req: IncomingMessage, res: ServerResponse) => {
    const { pathname } = parse(req.url || '', true);

    const userId = pathname ? idMatch(pathname)?.[1] : null;

    try {
        if (req.method === 'GET' && pathname === '/api/users') {
            const users = listUsers();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
            return;
        }

        if (req.method === 'GET' && userId) {
            const user = getUser(userId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
            return;
        }

        if (req.method === 'POST' && pathname === '/api/users') {
            const parsed = await getRequestBody(req);
            const newUser = createUser(parsed);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
            return;
        }

        if (req.method === 'PUT' && userId) {
            const parsed = await getRequestBody(req);
            const updated = updateUser(userId, parsed);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(updated));
            return;
        }

        if (req.method === 'DELETE' && userId) {
            deleteUser(userId);
            res.writeHead(204).end();
            return;
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not found' }));
    } catch (err: any) {
        handleError(res, err);
    }
};

function handleError(res: ServerResponse, err: any) {
    const status = err.status || 500;
    const message = err.message || 'Internal server error';
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
}
