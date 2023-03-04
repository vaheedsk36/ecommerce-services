import express, { Router } from 'express';
import { createNewAccount, updateAccount } from '../modules/settings';

const router:Router = express.Router();


router.post("/register",createNewAccount);
router.put("/update-account",updateAccount);

export default router;