import express, { Router } from 'express';
import { createNewAccount } from '../modules/settings';

const router:Router = express.Router();


router.post("/register",createNewAccount);

export default router;