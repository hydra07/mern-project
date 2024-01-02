import { Document } from 'mongoose';
import UserModel from '../models/user';
enum Status {
  Offline = 0,
  Online = 1,
}

export default class UserService {
  private user!: Document;
  constructor(user: Document) {
    this.user = user;
  }

  public setUserStatus = async (status: Status, socketId: String) => {
    this.user.set({
      status: status === Status.Online ? 'online' : 'offline',
      socketId: status === Status.Online ? socketId : null,
      lastActive: new Date(),
    });
    await this.user.save();
  };

  public getSocketIdFriend = async () => {
    const listIdFriend = this.user.get('listFriend');
    const listSocketIdFriend = [] as string[];
    for (const idFriend of listIdFriend) {
      const user: Document | null = await UserModel.findOne({
        _id: idFriend,
      }).exec();
      if (user) {
        listSocketIdFriend.push(user.get('socketId'));
      }
    }
    return listSocketIdFriend;
  };
}
