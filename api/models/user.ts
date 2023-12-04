import { Document, InferSchemaType, Schema, model } from 'mongoose';

export interface UserType {
  email: string;
  password: string;
  phone?: string | null;
}
export interface UserDocument extends UserType, Document {
  createdAt: Date;
  updatedAt: Date;
}
const userSchema = new Schema(
  {
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
  },
  { timestamps: true },
);

// const User = mongoose.model('User', userSchema);
type User = InferSchemaType<typeof userSchema>;
export default model<User>('User', userSchema);
// export type UserType = typeof User;
