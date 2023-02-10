const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/',async (req,res)=>{
    const usersList = await User.find();
    if(!usersList){
        res.status(500).json({success:false})
    }
    res.send(usersList)
})

module.exports = router;