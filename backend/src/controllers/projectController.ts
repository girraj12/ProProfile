import { Request, Response } from 'express';
import Profile from '../models/Profile.js';
import { projectSchema } from '../utils/validation.js';

export async function listProjects(req: Request, res: Response) {
  const profile = await Profile.findOne({ userId: req.userId }).select('projects').lean();
  return res.json({ projects: profile?.projects || [] });
}
export async function addProject(req: Request, res: Response) {
  const parsed = projectSchema.safeParse(req.body); if (!parsed.success) return res.status(400).json({ message: 'Invalid project data' });
  const profile = await Profile.findOneAndUpdate({ userId: req.userId }, { $push: { projects: parsed.data } }, { new: true }).lean();
  return res.status(201).json({ project: profile?.projects?.at(-1) });
}
export async function updateProject(req: Request, res: Response) {
  const parsed = projectSchema.partial().safeParse(req.body); if (!parsed.success) return res.status(400).json({ message: 'Invalid project data' });
  const set: Record<string, unknown> = {}; for (const [key, value] of Object.entries(parsed.data)) set[`projects.$.${key}`] = value;
  const profile = await Profile.findOneAndUpdate({ userId: req.userId, 'projects._id': req.params.id }, { $set: set }, { new: true }).lean();
  if (!profile) return res.status(404).json({ message: 'Project not found' });
  return res.json({ project: profile.projects.find((p: any) => String(p._id) === req.params.id) });
}
export async function deleteProject(req: Request, res: Response) {
  const profile = await Profile.findOneAndUpdate({ userId: req.userId }, { $pull: { projects: { _id: req.params.id } } }, { new: true }).lean();
  return res.json({ projects: profile?.projects || [] });
}
