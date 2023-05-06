import { Request, Response } from "express";
import { addItemsToCart, getOrderHistory } from "../dao/ordersDAO";
import { logger } from "../middlewares/logger";

export const getOrdersData = async (req: Request, res: Response) => {
  const ordersList = await getOrderHistory (+req.params.id);
  if (!ordersList) {
    res.status(500).json({ success: false });
  }
  res.send(ordersList);
};

export const addToCart = async(req:Request, res:Response) =>{
  const {
    customerId,
    productId,
    quantity,
    unitPrice,
    status
  } = req.body;

  try{
    const cartData = await addItemsToCart(
      customerId,
      productId,
      quantity,
      unitPrice,
      status
      );
    if (!cartData) {
      throw new Error('Unable to get cart data info')
    }
    res.json({
      success:true,
      message:'Item added to cart successfully'
    });

  }catch(err){
    logger.info("Unable to add item to cart");
    logger.error(err);
    res.status(400).json(err);
  }

}