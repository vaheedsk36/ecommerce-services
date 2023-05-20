import express, { Router } from 'express';
import { createNewUser, deleteExistingUser, getCurrentUserData, getUsersData } from '../modules/user';

const router:Router = express.Router();

router.get('/',getUsersData);
router.post('/',getCurrentUserData);
router.post('/signup',createNewUser);
router.delete('/delete-user',deleteExistingUser);
// update user data
export default router;