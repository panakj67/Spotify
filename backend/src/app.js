import express from 'express';
import authRoutes from './routes/auth.routes.js';
import songRoutes from './routes/song.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// ✅ Whitelisted frontend domains
const allowedOrigins = [
  'http://localhost:5173',
  'https://song-steam-frontend.onrender.com'
];

// ✅ CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ Blocked CORS request from: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.use('/auth', authRoutes);  // POST /auth/register, /login
app.use('/songs', songRoutes); // POST/GET for songs

export default app;
