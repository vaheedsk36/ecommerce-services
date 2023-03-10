import express from 'express';
import Category from '../models/category';

const router = express.Router();
// api for getting all the categories
router.get('/',)

// api for getting category by id
router.get('/:id',async (req,res)=>{
    try{
        const category = await Category.findById(req.params.id);
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

    try{
        category = await category.save();
        if(!category){
            res.status(400).json({
                status:false,
                message:'Unable to add new category '
            })
        }
        res.status(201).json(category);
    }catch(err){
        res.status(500).json({
            error:err,
            status:false
        })
    }
})

// api for finding category by id and update

router.put('/:id',async(req,res)=>{
    try{
        const category = await Category.findByIdAndUpdate(req.params.id,{
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
        const category = await Category.findByIdAndRemove(req.params.id);
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

export default router;