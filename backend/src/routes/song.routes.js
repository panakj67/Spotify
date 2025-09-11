import express from 'express';
import { upload,getSongs,getSongById ,searchSong} from '../controllers/song.controller.js';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage }); 

const router = express.Router();



router.use((req, res, next) => {
    // Check for token in cookies first
    let token = req.cookies.token;
    
    // If no token in cookies, check Authorization header
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }

    // For search endpoint, allow without authentication
    if (req.path === '/search-songs') {
        return next();
    }

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized - No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized - Invalid token",
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
})

router.post('/upload', uploadMiddleware.single("chacha") ,upload)

router.get('/get-songs',getSongs)

router.get('/get-song/:mama',getSongById)

router.get('/search-songs',searchSong)


export default router;