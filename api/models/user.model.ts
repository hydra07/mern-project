import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
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

const User = mongoose.model('User', userSchema);

export default User;
export type UserType = typeof User;
