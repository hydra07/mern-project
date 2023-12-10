import mongoose from 'mongoose';
import env from '../utils/validateEnv';
const port = env.PORT;

export const connectDB = async () => {
  mongoose
    .connect(env.MONGO_URI!)
    .then(() => {
      console.log('💓 Connected to MongoDB');
    })
    .catch((err: Error) => {
      console.log('Failed to connect to MongoDB', err);
    });
};
