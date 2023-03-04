import { Request, Response } from "express";

import User from "../models/user";

export const getUsersData = async (req: Request, res: Response) => {
  const usersList = await User.find();
  if (!usersList) {
    res.status(500).json({ success: false });
  }
  res.send(usersList);
};
