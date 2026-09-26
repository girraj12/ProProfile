import { Request, Response } from 'express';
import Profile from '../models/Profile.js';
import User from '../models/User.js';
import { profileSchema } from '../utils/validation.js';

export async function getMyProfile(req: Request, res: Response) {
  const [user, profile] = await Promise.all([
    User.findById(req.userId).select('email username').lean(),
    Profile.findOne({ userId: req.userId }).lean()
  ]);
  return res.json({ user, profile });
}

export async function updateMyProfile(req: Request, res: Response) {
  const parsed = profileSchema.safeParse(req.body); if (!parsed.success) return res.status(400).json({ message: 'Invalid profile data' });
  const profile = await Profile.findOneAndUpdate({ userId: req.userId }, { $set: parsed.data }, { new: true, runValidators: true }).lean();
  return res.json({ profile });
}

export async function getPublicProfile(req: Request, res: Response) {
  const user = await User.findOne({ username: req.params.username.toLowerCase() }).select('username').lean();
  if (!user) return res.status(404).json({ message: 'Profile not found' });
  const profile = await Profile.findOne({ userId: user._id }).select('-userId -_id -__v').lean();
  if (!profile) return res.status(404).json({ message: 'Profile not found' });
  return res.json({ username: user.username, profile });
}
