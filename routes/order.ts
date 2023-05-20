import express from 'express';
import { addToCart, getOrdersData, placeOrder, removeAllItemsFromCart, removeFromCart } from '../modules/order';

const router = express.Router();
router.get('/:id', getOrdersData);
router.post('/add-to-cart', addToCart);

// place order
router.post('/place-order', placeOrder);

// remove item from cart
router.post('/remove-from-cart', removeFromCart)
// remove cart
router.post('/empty-cart', removeAllItemsFromCart);
// cancelled order

export default router;