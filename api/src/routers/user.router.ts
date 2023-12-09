import express from 'express';
import { editprofile } from '../controllers/user.controller';

const router = express.Router();
router.post('/profile', editprofile);

export default router;
