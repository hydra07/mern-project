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
  },
  { timestamps: true },
);

// const User = mongoose.model('User', userSchema);
type User = InferSchemaType<typeof userSchema>;
export default model<User>('User', userSchema);
// export type UserType = typeof User;
