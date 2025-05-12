import { createServer } from 'http';
import { router } from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  router(req, res);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
