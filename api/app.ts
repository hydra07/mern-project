import bodyParser from 'body-parser';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import createHttpError, { isHttpError } from 'http-errors';
import authRouter from './routers/auth.router';
import indexRouter from './routers/index.router';
import env from './utils/validateEnv';
const app = express();
app.use(
  cors({
    origin: '*',
  }),
);

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_URI,
    }),
  }),
);

app.use('/', indexRouter);
app.use('/api/users', authRouter);

app.use((res, req, next) => {
  next(createHttpError(404, 'Not found'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});
export default app;
