import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routers/auth.router';
import indexRouter from './routers/index.router';

dotenv.config();
const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err: Error) => {
    console.log('Failed to connect to MongoDB', err);
  });

const app = express();

app.listen(port, () => {
  console.log(`⚡[server]: Server is running at http://localhost:${port}`);
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: '*',
  }),
);
app.use('/', indexRouter);
app.use('/api/users', authRouter);
