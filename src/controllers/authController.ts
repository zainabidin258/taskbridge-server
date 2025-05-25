import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUserModel } from '../models/User';
import { generateToken } from '../utils/generateToken';
import { IUserDocument } from '../types/User';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  }) as IUserDocument;

  const token = generateToken(user._id.toString());
  res.status(201).json({ user, token });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = generateToken((user as IUserDocument)._id.toString());
  res.json({ user, token });
};

