import express from 'express';
import { addToCart, getOrdersData } from '../modules/order';

const router = express.Router();
router.get('/:id',getOrdersData);
router.post('/add-to-cart',addToCart)
// place order
// remove item from cart
// remove cart
// cancelled order

export default router;