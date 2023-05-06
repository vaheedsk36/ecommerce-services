import express, { Application } from 'express';
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

app.listen(PORT,()=>{
    console.log(`App is listening at http://localhost:${PORT}`)
})