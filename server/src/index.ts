import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('user connected:', socket.id);
});

httpServer.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
