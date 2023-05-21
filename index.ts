import express, { Application } from 'express';
import cors from 'cors';
import passportRoutes from './routes/login';
import productsRoutes from './routes/product';
import ordersRoutes from './routes/order';
import usersRoutes from './routes/user';
import { requestLogger } from './middlewares/logger';
import dotenv from "dotenv";
import path from "path";
import passport from './middlewares/passport';

dotenv.config({
    encoding: "utf8",
    path: path.resolve(process.cwd(), ".env"),
});

const app: Application = express()
const PORT = process.env.PORT
const api = process.env.API_URL

app.use(cors())
app.options('*', cors())
app.use(express.json())

//passport middleware
app.use(passport.initialize());

// Routers
app.use(requestLogger);
app.use(`${api}/login`, passportRoutes)
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/users`, usersRoutes);

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})