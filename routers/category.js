const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// api for getting all the categories
router.get('/',async (req,res)=>{
    const categoriesList = await Category.find();
    if(!categoriesList){
        res.status(500).json({success:false})
    }
    res.status(200).send(categoriesList)
})

// api for getting category by id
router.get('/:id',async (req,res)=>{
    try{
        let category = await Category.findById(req.params.id);
        if(category){
            return res.status(200).send(category)
        }else{
            return res.status(404).json({
                success:false,
                message:'Category not found'
            })
        }
    }catch(err){
        return res.status(500).json({
            success:false,
            err:err
        })
    }
})

// api for adding new category
router.post('/',async(req,res)=>{
    let category = new Category({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color
    });
    category = await category.save();
    if(!category){
        res.status(500).json({
            error:err,
            status:false
        })
    }
    res.status(201).json(category);
})

// api for finding category by id and update

router.put('/:id',async(req,res)=>{
    try{
        let category = await Category.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            icon:req.body.icon,
            color:req.body.color
        },
        {
            new:true
        }
        );
        if(!category){
            res.status(400).json({
                status:false,
                message:'Unable to update the category '
            })
        }
        res.send(category)
    }catch(err){
        return res.status(500).json({
            success:false,
            err:err
        })
    }
})

// api for deleting a category by id

router.delete('/:id',async(req,res)=>{

    try{
        let category = await Category.findByIdAndRemove(req.params.id);
        if(category){
            return res.status(200).json({
                success:true,
                message:'Category has been deleted'
            })
        }else{
            return res.status(404).json({
                success:false,
                message:'Category not found'
            })
        }
    }catch(err){
        return res.status(500).json({
            success:false,
            err:err
        })
    }
})

module.exports = router;