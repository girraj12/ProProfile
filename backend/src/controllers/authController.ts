import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import { loginSchema, registerSchema } from '../utils/validation.js';

const cookieName = () => process.env.COOKIE_NAME || 'proprofile_token';
const cookieOptions = () => ({ httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, maxAge: 7 * 24 * 60 * 60 * 1000, path: '/' });
const signToken = (userId: string) => jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });

export async function register(req: Request, res: Response) {
  const parsed = registerSchema.safeParse(req.body); 
  if (!parsed.success) return res.status(400).json({ message: 'Invalid registration data' });
  const { email, password, username } = parsed.data;
  const exists = await User.findOne({ $or: [{ email }, { username: username.toLowerCase() }] }).lean();
  if (exists) return res.status(409).json({ message: 'Email or username already exists' });
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ email, passwordHash, username: username.toLowerCase() });
  await Profile.create({ userId: user._id });
  res.cookie(cookieName(), signToken(String(user._id)), cookieOptions());
  return res.status(201).json({ user: { id: user._id, email: user.email, username: user.username } });
}

export async function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body); if (!parsed.success) return res.status(400).json({ message: 'Invalid login data' });
  const user = await User.findOne({ email: parsed.data.email }).lean();
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return res.status(401).json({ message: 'Invalid email or password' });
  res.cookie(cookieName(), signToken(String(user._id)), cookieOptions());
  return res.json({ user: { id: user._id, email: user.email, username: user.username } });
}

export function logout(_req: Request, res: Response) { res.clearCookie(cookieName(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/' }); return res.json({ message: 'Logged out' }); }

export async function me(req: Request, res: Response) {
  const user = await User.findById(req.userId).select('_id email username').lean();
  return res.json({ user });
}
