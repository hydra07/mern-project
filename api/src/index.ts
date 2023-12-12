import mongoose from 'mongoose';
import app from './app';
import env from './utils/validateEnv';
import { connectDB } from './config/database';

// const port = env.PORT;
//
// mongoose
//   .connect(env.MONGO_URI!)
//   .then(() => {
//     console.log('💓 Connected to MongoDB');
//     app.listen(port, () => {
//       console.log(`⚡[server]: Server is running at http://localhost:${port}`);
//     });
//   })
//   .catch((err: Error) => {
//     console.log('Failed to connect to MongoDB', err);
//   });


app.listen(env.PORT, () => {
  console.log(`⚡[server]: Server is running at http://localhost:${env.PORT}`);
});

connectDB();
