const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/',async (req,res)=>{
    const productsList = await Product.find();
    if(!productsList){
        res.status(500).json({success:false})
    }
    res.send(productsList)
})

router.post('/',(req,res)=>{
    const product = new Product({
        name:req.body.name,
        image:req.body.image,
        countInStock:req.body.countInStock
    });
    product.save().then((createdProduct=>{
        res.status(201).json(createdProduct);
    })).catch((err)=>res.status(500).json({
        error:err,
        status:false
    }));
    // res.send(product)
})

module.exports = router;