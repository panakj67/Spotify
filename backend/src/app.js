import express from 'express';
import authRoutes from './routes/auth.routes.js';
import songRoutes from './routes/song.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// ✅ Whitelisted frontend domains
const allowedOrigins = [
  'http://localhost:5173',
  'https://song-steam-frontend.onrender.com', process.env.FRONTEND_URL
];

// ✅ CORS middleware
// Allow your frontend origin and credentials
app.use(cors({
  origin: allowedOrigins,  // frontend URL
  credentials: true
}));

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send("API is working !!")
})

// ✅ Routes
app.use('/auth', authRoutes);  // POST /auth/register, /login
app.use('/songs', songRoutes); // POST/GET for songs

export default app;
