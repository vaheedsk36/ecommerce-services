import express from 'express'
const app = express()
import bodyParser from 'body-parser'
import morgan from 'morgan'
import mongoose, { ConnectOptions } from 'mongoose'
import cors from 'cors'
require('dotenv/config')

const PORT = process.env.PORT
const api = process.env.API_URL

// middleware
app.use(cors())
app.options('*',cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

// routes
import productsRoutes from './routers/product'
import categoriesRoutes from './routers/category'
import ordersRoutes from './routers/order'
import usersRoutes from './routers/user'

// Routers
app.use(`${api}/products`,productsRoutes)
app.use(`${api}/categories`,categoriesRoutes)
app.use(`${api}/orders`,ordersRoutes)
app.use(`${api}/users`,usersRoutes)

/**
 * * When the strict option is set to true, Mongoose will ensure that only the fields that are 
 * * specified in your schema will be saved in the database, and all other fields will not be 
 * * saved (if some other fields are sent).
 */

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'ecommerce-website'
} as ConnectOptions)
.then(()=>{
    console.log('DB is runnning')
})
.catch((err)=>{
    console.log(err)
})

app.listen(PORT,()=>{
    console.log(`App is listening at PORT:${PORT}`)
})