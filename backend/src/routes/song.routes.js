import express from 'express';
import { upload,getSongs,getSongById ,searchSong} from '../controllers/song.controller.js';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage: storage }); 

const router = express.Router();



router.use((req,res,next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        next()
    }catch(err){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    
})

router.post('/upload', uploadMiddleware.single("chacha") ,upload)

router.get('/get-songs',getSongs)

router.get('/get-song/:id', getSongById);

router.get('/search-songs',searchSong)


export default router;