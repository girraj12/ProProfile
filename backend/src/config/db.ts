import dns from "node:dns";
import mongoose from 'mongoose';

dns.setServers(["1.1.1.1", "8.8.8.8"]);
export async function connectDB(uri: string) {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log('MongoDB connected');
}
