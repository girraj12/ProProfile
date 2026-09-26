import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes); 
app.use('/api/profile', profileRoutes); 
app.use('/api/projects', projectRoutes);
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => { 
    console.error(err); 
    res.status(500).json({ message: 'Internal server error' }); 
});

const port = Number(process.env.PORT || 5000);
connectDB(process.env.MONGODB_URI!).then(() => app.listen(port, () => console.log(`API running on ${port}`))).catch(err => { console.error('DB connection failed', err); process.exit(1); });
