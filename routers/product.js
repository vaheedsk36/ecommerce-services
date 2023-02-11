const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/',async (req,res)=>{
    const productsList = await Product.find().select('name image -_id');
    if(!productsList){
        res.status(500).json({success:false})
    }
    res.send(productsList)
})

router.get('/:id',async (req,res)=>{
    try{
        const productsList = await Product.findById(req.params.id);
        if(!productsList){
            res.status(400).json({success:false})
        }
        res.send(productsList)
    }catch(err){
        res.status(500).json({
            error:err,
            status:false
        })
    }
})

router.post('/',async (req,res)=>{
    try{
        let product = new Product({
            name:req.body.name,
            image:req.body.image,
            countInStock:req.body.countInStock
        });
        product = await product.save();
        if(!product){
            res.status(400).json({
                error:err,
                status:false
            })
        }
        res.status(201).json(product);

    }catch(err){
        res.status(500).json({
            error:err,
            status:false
        })
    }
})

module.exports = router;