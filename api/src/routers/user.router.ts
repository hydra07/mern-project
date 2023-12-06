import express from 'express';
import { getAuthenticatedUser } from '../controllers/auth.controller';
import { requiresAuth } from '../middleware/auth';

const router = express.Router();

// router.get('/', requiresAuth, getAuthenticatedUser);
// router.get('/profile', )