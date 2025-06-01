import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

//Rotas a serem criadas ainda

import authRoutes from './routes/auth';
import couseRoutes from './routes/courses';
import userRoutes from './routes/users';
import { log, timeStamp } from 'console';

dotenv.config();

export const prisma = new PrismaClient();
const app = express();

//Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Health check

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timeStamp: new Date().toISOString() });
});

//Routes 

app.use('/api/auth', authRoutes);
app.use('/api/courses', couseRoutes);
app.use('/api/users', userRoutes);

//Error handling

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

export default app;
