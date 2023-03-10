import { Request,Response } from 'express';
import AccountSettings from '../models/settings';
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import randtoken from "rand-token";

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
          const { username, password, phone, email } = req.body;

          const userData: any = {
            clientId: uuidv4(),
            username,
            password,
            phone,
            email,
          };

          const token = jwt.sign(
            { clientId: userData.clientId, email: userData.email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );

          const refreshToken = randtoken.uid(256);
          const refreshTokens = {
            username,
            refreshToken,
          };
          userData.refreshtokens = refreshTokens;

          let user = new AccountSettings(userData);
          user = await user.save();
          if (!user) {
            throw new Error("Unable to create your account");
          }
          res.status(201).json({
            status: true,
            message:{
              token: 'JWT ' + token,
              refreshToken:refreshToken
            }
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};


export const updateAccount = async (req: Request, res: Response) => {
  //TODO The data to be updated will be dynamic so, the hard coded object has to be removed
  //TODO The clientId need to get it from the middleware for the authentication
  try {
    const user = await AccountSettings.findOneAndUpdate(
      { clientId: req.headers["clientid"] },
      {
        username: req.body.username,
        // password: req.body.password,
      },
      {
        new: true,
      }
    );
    if (!user) {
      res.status(400).json({
        status: false,
        message: "Unable to update changes",
      });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const user = await AccountSettings.findOneAndDelete({
      clientId: req.headers["clientid"],
    });
    if (!user) {
      res.status(400).json({
        status: false,
        message: "Unable to delete your account",
      });
    }
    res
      .status(200)
      .json({ status: true, message: "Account has been deleted successfully" });
  } catch (err) {
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

