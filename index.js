const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const productsRouter = require('./routers/products');
require('dotenv/config')

const PORT = process.env.PORT
const api = process.env.API_URL


// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

// Routers
app.use(`${api}/products`,productsRouter)


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