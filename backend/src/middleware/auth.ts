import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';

declare global { namespace Express { interface Request { userId?: string } } }

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.[process.env.COOKIE_NAME || 'proprofile_token'];
    if (!token) return res.status(401).json({ message: 'Authentication required' });
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(payload.userId).select('_id').lean();
    if (!user) return res.status(401).json({ message: 'Invalid session' });
    req.userId = String(user._id);
    next();
  } catch { return res.status(401).json({ message: 'Invalid or expired session' }); }
}
