import { Request, Response } from "express";
import Order from "../models/order";

export const getOrdersData = async (req: Request, res: Response) => {
  const ordersList = await Order.find();
  if (!ordersList) {
    res.status(500).json({ success: false });
  }
  res.send(ordersList);
};
