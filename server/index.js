import express from 'express';
import { createServer } from 'http';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Server as SocketServer } from 'socket.io';
import { socketIoConfig } from './socketIoConfig.js';

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: { origin: '*' },
});
const __dirname = dirname(fileURLToPath(import.meta.url));

io.on('connection', socketIoConfig);

httpServer.listen(PORT);

app.use(express.static(join(__dirname, '../client/dist')));
app.use('*', (_, res) => {
  res.sendFile(join(__dirname, '../client/dist', 'index.html'));
});
