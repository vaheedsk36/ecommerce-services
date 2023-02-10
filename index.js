const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
require('dotenv/config')

const PORT = process.env.PORT
const api = process.env.API_URL

const productSchema = new Schema({
    name:String,
    image:String,
    countInStock:Number
})
const Product = mongoose.model('Product',productSchema);

//middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.get(`${api}/products`,(req,res)=>{
    const product = {
        id:'1',
        name:'Hair Dryer',
        image:'some_url'
    }
    res.send(product)
})

app.post(`${api}/products`,(req,res)=>{
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

mongoose.connect(process.env.DB_CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'ecommerce-website'
})
.then(()=>{
    console.log('DB is runnning')
})
.catch((err)=>{
    console.log(err)
})

app.listen(PORT,()=>{
    console.log(`App is listening at PORT:${PORT}`)
})