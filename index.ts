import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import productsRoutes from './routes/product';
import categoriesRoutes from './routes/category';
import ordersRoutes from './routes/order';
import usersRoutes from './routes/user';
import userSettingsRoute from './routes/settings';
import { requestLogger } from './middlewares/logger';
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    encoding: "utf8",
    path: path.resolve(process.cwd(), ".env"),
});

const app:Application = express()
const PORT = process.env.PORT
const api = process.env.API_URL

// middleware
// (express.json())bodyParser is included in the express now (https://stackoverflow.com/a/69620344)
app.use(cors())
app.options('*',cors())
app.use(express.json())

// Routers
app.use(requestLogger);
app.use(`${api}/products`,productsRoutes);
app.use(`${api}/categories`,categoriesRoutes);
app.use(`${api}/orders`,ordersRoutes);
app.use(`${api}/users`,usersRoutes);
app.use(`${api}/account`,userSettingsRoute);

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
    console.log('DB connection established!')
})
.catch((err)=>{
    console.log(err)
})

app.listen(PORT,()=>{
    console.log(`App is listening at http://localhost:${PORT}`)
})