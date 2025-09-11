import express from 'express';
import authRoutes from './routes/auth.routes.js';
import songRoutes from './routes/song.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// ✅ CORS middleware with simplified configuration
app.use(cors({
  origin: '*',  // Allow all origins temporarily to debug
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use('/auth', authRoutes);  // POST /auth/register, /login
app.use('/songs', songRoutes); // POST/GET for songs

export default app;
