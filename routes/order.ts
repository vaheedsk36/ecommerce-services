import express from 'express';
import { addToCart, getOrdersData } from '../modules/order';

const router = express.Router();
router.get('/',getOrdersData);
router.post('/add-to-cart',addToCart)


export default router;