import cluster from 'cluster';
import http, { IncomingMessage, RequestOptions } from 'http';
import os from 'os';
import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();

const PORT = process.env.PORT_CLUSTER ? parseInt(process.env.PORT_CLUSTER) : 4000;
const numCPUs = os.cpus().length - 1;

let currentWorker = 0;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    const workers: number[] = [];

    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();
        workers.push(i + 1);
    }

    const server = http.createServer((req, res) => {
        const targetPort = PORT + workers[currentWorker];
        currentWorker = (currentWorker + 1) % workers.length;

        const options: RequestOptions = {
            hostname: 'localhost',
            port: targetPort,
            path: req.url,
            method: req.method,
            headers: req.headers
        };

        const proxy = http.request(options, proxyRes => {
            res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
            proxyRes.pipe(res, { end: true });
        });

        proxy.on('error', err => {
            res.writeHead(500);
            res.end('Proxy error: ' + err.message);
        });

        req.pipe(proxy, { end: true });
    });

    server.listen(PORT, () => {
        console.log(`Load balancer listening on http://localhost:${PORT}`);
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });

} else {
    const workerId = cluster.worker?.id ?? 1;
    const workerPort = PORT + workerId;

    http.createServer(app).listen(workerPort, () => {
        console.log(`Worker ${process.pid} listening on http://localhost:${workerPort}`);
    });
}
