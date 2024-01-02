import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import env from '../utils/validateEnv';
interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
}
interface SignInBody {
  username?: string;
  password?: string;
}
export const SignUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;
  const phone = req.body.phone;
  try {
    if (!username || !email || !passwordRaw || !phone) {
      throw createHttpError(400, 'Parameters missing');
    }
    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec();
    if (existingUsername) {
      throw createHttpError(409, 'Username already exists');
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
      username: username,
      email: email,
      password: passwordHashed,
      phone: phone,
    });

    // req.session.userId = newUser._id;
    const token = jwt.sign({ id: newUser._id }, env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.cookie('access_token', token, { httpOnly: true }).status(201).json({
      message: 'Created new user successfully',
      user: newUser,
      token: token,
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
  const username = req.body.username;
  const password = req.body.password;
  try {
    if (!username || !password) {
      throw createHttpError(400, 'Parameters missing');
    }
    const user = await UserModel.findOne({ username: username })
      .select('+password')
      .exec();
    if (!user) {
      throw createHttpError(401, 'User not found');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw createHttpError(401, 'Wrong password');
    }
    // req.session.userId = user._id;
    const token = jwt.sign({ id: user._id }, env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000);

    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({
        message: 'Login successful',
        // user: user,
        token: token,
      });
  } catch (error) {
    next(error);
  }
};

export const SignOut: RequestHandler = async (req, res, next) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};
export const google: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  let username = email.split('@')[0]; // remove @gmail.com from the email
  try {
    const user = await UserModel.findOne({ email: email }).exec();
    if (user) {
      // req.session.userId = user._id;
      const token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
        expiresIn: '1d',
      });
      res.cookie('access_token', token, { httpOnly: true }).status(201).json({
        message: 'Login successful  ',
        // user: user,
        token: token,
      });
    } else {
      const existingUsername = await UserModel.findOne({ username: username });
      while (existingUsername) {
        username += Date.now().toString().slice(-4);
      }
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = await UserModel.create({
        name: req.body.name,
        username: username,
        email: email,
        password: hashedPassword,
        phone: req.body.phone,
        // avatar: await imageToBase64(req.body.avatar),
        avatar: req.body.avatar,
      });
      // req.session.userId = newUser._id;

      const token = jwt.sign({ id: newUser._id }, env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.cookie('access_token', token, { httpOnly: true }).status(201).json({
        message: 'Created new user successfully',
        // user: newUser,
        token: token,
      });
    }
  } catch (error) {
    next(error);
  }
};
