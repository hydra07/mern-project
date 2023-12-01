import bcryptjs from 'bcryptjs';
import console from 'console';
import { Request, Response } from 'express';
import User from '../models/user.model';

export const signup = async (req: Request, res: Response) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  };
  console.log(user);
  const hashedPassword = await bcryptjs.hashSync(user.password, 10);
  const newUser = new User({
    email: user.email,
    password: hashedPassword,
    phone: user.phone,
  });
  try {
    // await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send(error);
  }
};
