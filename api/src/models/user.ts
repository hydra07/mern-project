import { Date, Document, InferSchemaType, Schema, model } from 'mongoose';

export interface UserType {
  name?: string | null;
  username?: string;
  email: string;
  password: string;
  phone?: string | null;
  birthday?: string | null;
  avatar?: string | null;
  address?: string | null;
  status?: string | null;
  lastActive?: Date | null;
  listFriend?: string[] | null;
  socketId?: string | null;
}
export interface UserDocument extends UserType, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      max: 50,
    },
    username: {
      type: String,
      required: false,
      max: 50,
      unique: true,
    },
    birthday: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    phone: {
      type: String,
      required: false,
      max: 11,
      min: 10,
    },
    avatar: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    lastActive: {
      type: Date,
      required: false,
    },
    listFriend: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      required: false,
    },
    socketId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

type User = InferSchemaType<typeof userSchema>;
export default model<User>('User', userSchema);
