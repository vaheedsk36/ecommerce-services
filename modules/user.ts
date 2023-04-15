import { Request, Response } from "express";
import { addNewUser, getUserData, listUsers } from "../dao/usersDAO";
import { logger } from "../middlewares/logger";

export const getUsersData = async (req: Request, res: Response) => {
  try{
    const usersList = await listUsers();

    if (!usersList) {
      throw new Error('Unable to get users info')
    }
    res.json(usersList);

  }catch(err){
    logger.info("unable to get user data");
    logger.error(err);
    res.status(400).json(err);
  }

};

export const createNewUser = async (req:Request,res:Response)=>{
  try{
    const userData = await addNewUser(req.body);
    if (!userData) {
      throw new Error('Unable to get users info')
    }
    res.json({
      success:true,
      message:'New user created successfully'
    });

  }catch(err){
    logger.info("Unable to create new user");
    logger.error(err);
    res.status(400).json(err);
  }

}
