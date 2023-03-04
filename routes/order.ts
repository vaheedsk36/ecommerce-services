import express from 'express';
import { getOrdersData } from '../modules/order';

const router = express.Router();
router.get('/',getOrdersData)

export default router;