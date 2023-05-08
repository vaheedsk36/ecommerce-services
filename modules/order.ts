import { Request, Response } from "express";
import { addItemsToCart, addToOrderHistory, getItemsFromCart, getOrderHistory, removeAllItemsFromCartDAO, removeItemFromCartDAO, updateCartOnPurchase } from "../dao/ordersDAO";
import { logger } from "../middlewares/logger";
import { compact } from 'underscore'
export const getOrdersData = async (req: Request, res: Response) => {
  try {
    const ordersList = await getOrderHistory(+req.params.id);
    if (!ordersList) {
      res.status(500).json({ success: false });
    }
    res.send(ordersList);
  } catch (err) {
    logger.info("Unable to add item to cart");
    logger.error(err);
    res.status(400).json(err);
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { customerId, productId, quantity, unitPrice, status } = req.body;

    const cartData = await addItemsToCart(
      customerId,
      productId,
      quantity,
      unitPrice,
      status
    );
    if (!cartData) {
      throw new Error("Unable to get cart data info");
    }
    res.json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (err) {
    logger.info("Unable to add item to cart");
    logger.error(err);
    res.status(400).json(err);
  }
};

export const removeFromCart = async (
  req: Request,
  res: Response
) => {
  try {
    const { customerId, productId } = req.body;
    const isItemRemoved = await removeItemFromCartDAO(
      customerId,
      productId
    );

    if (isItemRemoved) {
      return res.json({
        status: true,
        message: 'Item removed from cart'
      })
    }
    else {
      throw new Error('Item does not exist in cart')
    }
  } catch (err) {
    logger.info("Unable to remove item from cart");
    logger.error(err.message);
    res.status(400).json(err);
  }
}

export const removeAllItemsFromCart = async (
  req: Request,
  res: Response
) => {
  try {
    const { customerId } = req.body;
    const isItemsRemoved = await removeAllItemsFromCartDAO(customerId);

    if (isItemsRemoved) {
      return res.json({
        status: true,
        message: 'Items removed from cart'
      })
    }
    else {
      throw new Error('Item does not exist in cart')
    }
  } catch (err) {
    logger.info("Unable to remove item from cart");
    logger.error(err.message);
    res.status(400).json({
      status: false,
      message: err.message
    });
  }
}

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.body.id;
    const updateCartStatus = [];
    const itemsInCart = await getItemsFromCart(+customerId);
    const formulateBill = itemsInCart.map((item) => ({
      ...item,
      customer_id: customerId,
      total_price: item.quantity * item.unit_price
    }));

    const totalBill =
      itemsInCart.reduce((acc, item) =>
        acc + (item.quantity * item.unit_price)
        , 0
      );


    const isOrderHistoryUpdated = await addToOrderHistory(formulateBill);

    if (isOrderHistoryUpdated) {
      await Promise.all(
        formulateBill.map(async (item) => {
          updateCartStatus.push(
            await updateCartOnPurchase(item)
          )
        })
      );

      if (!((compact(updateCartStatus)).length !== itemsInCart.length)) {
        return res.json({
          status: true,
          message: 'Order placed successfully',
          bill: formulateBill,
          total: totalBill
        })
      }

      throw new Error('Failed to update cart.')
    } else {
      throw new Error('Failed to place order')
    }

    // update cart

  } catch (err) {
    logger.info("Unable to place order");
    logger.error(err);
    res.status(400).json(err);
  }
};
