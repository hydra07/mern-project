import { createServer } from 'http';
import { Server } from 'socket.io';
import SocketService from '../services/socket.service';
import app from './app';
const server = createServer(app);
// const server = http.createServer(app);
const io = new Server(server, {
  path: '/socket',
  cors: {
    origin: '*',
  },
});
io.on('connection', (socket) => {
  const socketService = new SocketService(socket);
  socketService.handleConnection();
});

export default server;
