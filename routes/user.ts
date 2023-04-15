import express, { Router } from 'express';
import { createNewUser, getUsersData } from '../modules/user';

const router:Router = express.Router();

router.get('/',getUsersData);
router.post('/signup',createNewUser);


export default router;