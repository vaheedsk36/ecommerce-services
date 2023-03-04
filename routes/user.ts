import express, { Router } from 'express';
import { getUsersData } from '../modules/user';

const router:Router = express.Router();

router.get('/',getUsersData)

export default router;