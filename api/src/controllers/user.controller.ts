import { NextFunction, RequestHandler, Response } from 'express';
import createHttpError from 'http-errors';
import { RequestWithUser } from '../middleware/auth';
import UserModel from '../models/user';
interface BodyProfile {
  username: string;
  name?: string;
  phone?: string;
  birthday?: string;
  address?: string;
  avatar?: string;
}

export const editprofile: RequestHandler<
  unknown,
  unknown,
  BodyProfile,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const newName = req.body.name;
  const newPhone = req.body.phone;
  const newBirthday = req.body.birthday;
  const newAddress = req.body.address;
  const newAvatar = req.body.avatar;
  try {
    const user = await UserModel.findOne({ username: username }).exec();
    if (!user) {
      throw createHttpError(404, 'Error');
    }
    if (newName !== user.name) {
      user.name = newName;
    }
    if (newPhone !== user.phone) {
      const phoneVaild = await UserModel.findOne({ phone: newPhone }).exec();
      if (phoneVaild) {
        // throw createHttpError(409, 'Phone already exists');
        res.status(200).json({
          error: 'Phone already exists',
          user: user,
        });
      } else {
        user.phone = newPhone;
      }
    }
    if (newBirthday !== user.birthday) {
      user.birthday = newBirthday;
    }
    if (newAddress !== user.address) {
      user.address = newAddress;
    }
    if (newAvatar !== user.avatar) {
      user.avatar = newAvatar;
    }
    await user.save();
    res.status(200).json({
      message: 'Update profile successfully',
      user: user,
    });
  } catch (e) {
    next(e);
  }
};

export const getProfile = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserModel.findById(req.user?.id)
      .select('+email +phone +avatar +address')
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
