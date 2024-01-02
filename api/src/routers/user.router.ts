import express from 'express';
import { editprofile, getProfile } from '../controllers/user.controller';
import { requiresAuth } from '../middlewares/auth';

const router = express.Router();
router.post('/profile', requiresAuth, editprofile);
router.get('/profile', requiresAuth, getProfile);
export default router;
