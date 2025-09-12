import express from 'express';
import {registerUser,loginUser,me, logoutUser}from "../controllers/auth.controller.js";

const router = express.Router();


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/me',me)
router.post("/logout", logoutUser); 

export default router;