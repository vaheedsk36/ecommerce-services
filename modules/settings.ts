import { Request,Response } from 'express';
import AccountSettings from '../models/settings';

// import { ApiResponse, CategoryList } from '../types';

export const createNewAccount = async (req: Request, res: Response) => {
    try {
      AccountSettings.countDocuments(
        { username: req.body.username },
        async (err: Error, count: number) => {
          if (count > 0) {
            res
              .status(400)
              .json({ status: false, message: "User already exists" });
          } else {
            let user = new AccountSettings({
              username: req.body.username,
              password: req.body.password,
            });
            user = await user.save();
            if (!user) {
              throw new Error("Unable to create your account");
            }
            res.status(201).json(user);
          }
        }
      );
    } catch (err) {
      res.status(500).json({
        error: err,
        status: false,
      });
    }
  }

