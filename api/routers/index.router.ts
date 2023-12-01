import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
const router = express.Router();

router.get('/checkdb', async (req: Request, res: Response) => {
  try {
    await mongoose.connection.db.command({ ping: 0 });
    res.send('Connected to Database');
  } catch (error) {
    res.status(499).send(error);
  }
});

router.get('/savedb', (req: Request, res: Response) => {
  res.send('💓Express + TypeScript Server');
  // console.log('💓Express + TypeScript Server');
  // const user = new User({
  //   email: 'a@gmail.com',
  //   password: '123456',
  //   phone: '1234567890',
  // });
  // user.save();
  // console.log('User saved');
});

export default router;
