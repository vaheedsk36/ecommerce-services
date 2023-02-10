const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv/config')

const PORT = process.env.PORT
const api = process.env.API_URL

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
    const newProduct = req.body;
    console.log(newProduct,'newProduct');
    res.send(newProduct)
})

app.listen(PORT,()=>{
    console.log(`App is listening at PORT:${PORT}`)
})