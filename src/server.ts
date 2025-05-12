import http from 'http';
import { app } from './app';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

http.createServer(app).listen(PORT, () => {
    console.log(`[Worker ${process.pid}] Server is running on http://localhost:${PORT}`);
});
