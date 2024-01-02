import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import createHttpError, { isHttpError } from 'http-errors';
import morgan from 'morgan';
import authRouter from '../routers/auth.router';
import indexRouter from '../routers/index.router';
import userRouter from '../routers/user.router';

const app = express();

app.use(
  cors({
    origin: '*',
    // origin: 'http://localhost:5173',
  }),
);
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/api/users', authRouter);
app.use('/api/users', userRouter);
app.use((res, req, next) => {
  next(createHttpError(404, 'Not found'));
});
app.use((req, res, next) => {
  console.log('Cookies: ' + req.cookies);
  next();
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
