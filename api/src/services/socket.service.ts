import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import { Socket } from 'socket.io';
import UserModel from '../models/user';
import env from '../utils/validateEnv';
import { default as UserService } from './user.service';

export default class SocketService {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  handleConnection() {
    const token = this.socket.handshake.query.token as string;
    jwt.verify(token, env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log('error: ', err.message);
        this.socket.disconnect();
      } else {
        const user = await UserModel.findOne({
          _id: (decoded as { id: string }).id,
        }).exec();
        if (user) {
          const userService = new UserService(user);
          await userService.setUserStatus(1, this.socket.id);
          this.sendStatus(user);

          this.socket.on('disconnect', async () => {
            await userService.setUserStatus(0, this.socket.id);
            this.sendStatus(user);
          });
        }
      }
    });
  }
  
  async sendStatus(user: Document) {
    const userService = new UserService(user);
    for (const friendsSocketId of await userService.getSocketIdFriend()) {
      this.socket.to(friendsSocketId).emit('userStatus', {
        username: user.get('username'),
        name: user.get('name'),
        status: user.get('status'),
        lastActive: user.get('lastActive'),
      });
    }
  }

  sendMessage() {
    this.socket.on('message', (msg: JSON) => {
      console.log(msg);
    });
  }
}
