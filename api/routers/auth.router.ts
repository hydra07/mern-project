import express from 'express';
import {
  SignIn,
  SignOut,
  SignUp,
  getAuthenticatedUser,
} from '../controllers/auth.controller';

const router = express.Router();

router.get('/', getAuthenticatedUser);
router.post('/signup', SignUp);
router.post('/signin', SignIn);
router.get('/signout', SignOut);
export default router;
