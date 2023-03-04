import express, { Router } from 'express';
import User from '../models/user';

const router:Router = express.Router();

router.get('/',async (req,res)=>{
    const usersList = await User.find();
    if(!usersList){
        res.status(500).json({success:false})
    }
    res.send(usersList)
})

export default router;