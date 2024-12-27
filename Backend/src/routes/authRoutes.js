import express from 'express';
import { googleLogin, googleCallback } from '../controllers/authController.js';

const Authrouter = express.Router();

Authrouter.get('/google', googleLogin);
Authrouter.get('/google/callback', googleCallback)

export default Authrouter;
