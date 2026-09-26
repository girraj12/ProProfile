import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/)
});

export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
export const profileSchema = z.object({
  fullName: z.string().max(100).optional(), headline: z.string().max(160).optional(), bio: z.string().max(1500).optional(),
  location: z.string().max(120).optional(), avatarUrl: z.string().max(500).optional(), linkedinUrl: z.string().max(500).optional(),
  githubUrl: z.string().max(500).optional(), portfolioUrl: z.string().max(500).optional(), resumeUrl: z.string().max(500).optional(),
  skills: z.array(z.string().max(50)).max(30).optional(), experience: z.array(z.any()).max(20).optional(), education: z.array(z.any()).max(20).optional()
});
export const projectSchema = z.object({
  title: z.string().min(1).max(120), description: z.string().max(2000).optional(), techStack: z.array(z.string().max(50)).max(20).optional(),
  githubUrl: z.string().max(500).optional(), liveUrl: z.string().max(500).optional(), order: z.number().int().optional()
});
