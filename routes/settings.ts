import express, { Router } from 'express';
import { createNewAccount, deleteAccount, updateAccount } from '../modules/settings';

const router:Router = express.Router();


router.post("/register",createNewAccount);
router.put("/update-account",updateAccount);
router.delete("/delete-account",deleteAccount);


export default router;