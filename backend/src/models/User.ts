import mongoose, { Schema, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true,
    index: true
   },
  passwordHash: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true, 
    index: true, 
    minlength: 3, 
    maxlength: 30 },
}, { timestamps: true });

export type User = InferSchemaType<typeof userSchema>;
export default mongoose.model('User', userSchema);
