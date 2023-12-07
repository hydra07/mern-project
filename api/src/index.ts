import mongoose from 'mongoose';
import app from './app';
import env from './utils/validateEnv';
const port = env.PORT;

mongoose
  .connect(env.MONGO_URI!)
  .then(() => {
    console.log('💓 Connected to MongoDB');
    app.listen(port, () => {
      console.log(`⚡[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err: Error) => {
    console.log('Failed to connect to MongoDB', err);
  });
