import { IncomingMessage } from 'http';

export const getRequestBody = (req: IncomingMessage): Promise<any> => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const parsed = JSON.parse(body || '{}');
                resolve(parsed);
            } catch (error) {
                reject({ status: 400, message: 'Invalid JSON body' });
            }
        });

        req.on('error', () => {
            reject({ status: 500, message: 'Failed to read request body' });
        });
    });
};
