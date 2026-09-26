import mongoose, { Schema, InferSchemaType } from 'mongoose';

const itemSchema = new Schema({
  title: { type: String, trim: true, maxlength: 120 },
  company: { type: String, trim: true, maxlength: 120 },
  description: { type: String, trim: true, maxlength: 2000 },
  startDate: { type: String, trim: true },
  endDate: { type: String, trim: true },
  location: { type: String, trim: true, maxlength: 120 },
  degree: { type: String, trim: true, maxlength: 120 },
  institution: { type: String, trim: true, maxlength: 160 },
  url: { type: String, trim: true, maxlength: 500 }
}, { _id: true });

const projectSchema = new Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, trim: true, maxlength: 2000 },
  techStack: [{ type: String, trim: true, maxlength: 50 }],
  githubUrl: { type: String, trim: true, maxlength: 500 },
  liveUrl: { type: String, trim: true, maxlength: 500 },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const profileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  fullName: { type: String, trim: true, maxlength: 100, default: '' },
  headline: { type: String, trim: true, maxlength: 160, default: '' },
  bio: { type: String, trim: true, maxlength: 1500, default: '' },
  location: { type: String, trim: true, maxlength: 120, default: '' },
  avatarUrl: { type: String, trim: true, maxlength: 500, default: '' },
  linkedinUrl: { type: String, trim: true, maxlength: 500, default: '' },
  githubUrl: { type: String, trim: true, maxlength: 500, default: '' },
  portfolioUrl: { type: String, trim: true, maxlength: 500, default: '' },
  resumeUrl: { type: String, trim: true, maxlength: 500, default: '' },
  skills: [{ type: String, trim: true, maxlength: 50 }],
  experience: [itemSchema],
  education: [itemSchema],
  projects: [projectSchema],
}, { timestamps: true });

export type Profile = InferSchemaType<typeof profileSchema>;
export default mongoose.model('Profile', profileSchema);
