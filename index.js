const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

const PORT = process.env.PORT
const api = process.env.API_URL


// middleware
app.use(cors())
app.options('*',cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

// routes
const productsRoutes = require('./routers/product');
const categoriesRoutes = require('./routers/category');
const ordersRoutes = require('./routers/order');
const usersRoutes = require('./routers/user');

// Routers
app.use(`${api}/products`,productsRoutes)
app.use(`${api}/categories`,categoriesRoutes)
app.use(`${api}/orders`,ordersRoutes)
app.use(`${api}/users`,usersRoutes)


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