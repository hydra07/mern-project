import bcrypt from 'bcryptjs';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/user';
import { downloadImage } from '../utils/image';
interface SignUpBody {
  email?: string;
  password?: string;
  phone?: string;
}
interface SignInBody {
  email?: string;
  password?: string;
}
export const getAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserModel.findById(req.session.userId)
      .select('+email +phone +avatar +address')
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const SignUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const email = req.body.email;
  const passwordRaw = req.body.password;
  const phone = req.body.phone;
  try {
    if (!email || !passwordRaw || !phone) {
      throw createHttpError(400, 'Parameters missing');
    }

    const existingEmail = await UserModel.findOne({ email: email }).exec();
    if (existingEmail) {
      throw createHttpError(409, 'Email already exists');
    }
    const existingPhone = await UserModel.findOne({ phone: phone }).exec();
    if (existingPhone) {
      throw createHttpError(409, 'Phone already exists');
    }
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);
    const newUser = await UserModel.create({
      email: email,
      password: passwordHashed,
      phone: phone,
    });

    req.session.userId = newUser._id;
    res.status(201).json({
      message: 'Created new user successfully',
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const SignIn: RequestHandler<
  unknown,
  unknown,
  SignInBody,
  unknown
> = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      throw createHttpError(400, 'Parameters missing');
    }
    const user = await UserModel.findOne({ email: email })
      .select('+password')
      .exec();
    if (!user) {
      throw createHttpError(401, 'User not found');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw createHttpError(401, 'Wrong password');
    }

    req.session.userId = user._id;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const SignOut: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    } else {
      // res.sendStatus(200).json({ message: 'Signed out' });
      res.status(200).json({ message: 'Signed out' });
    }
    // res.clearCookie('connect.sid').status(200).json({ message: 'Signed out' });
  });
};

export const google: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  try {
    const user = await UserModel.findOne({ email: email }).exec();
    if (user) {
      req.session.userId = user._id;
      res.status(200).json(user);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = await UserModel.create({
        email: email,
        password: hashedPassword,
        // phone: req.body.phone,
        avatar: await downloadImage(req.body.avatar, 'avatars', email),
      });
      req.session.userId = newUser._id;
      res.status(201).json({
        message: 'Created new user successfully',
        user: newUser,
      });
    }
  } catch (error) {
    next(error);
  }
};
