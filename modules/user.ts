import { Request, Response } from "express";
import { addNewUser, deleteUser, getUserData, listUsers } from "../dao/usersDAO";
import { logger } from "../middlewares/logger";

export const getUsersData = async (req: Request, res: Response) => {
  try{
    const usersList = await listUsers();

    if (!usersList) {
      throw new Error('Unable to get users info')
    }
    res.json(usersList);

  }catch(err){
    logger.info("unable to get users data");
    logger.error(err);
    res.status(400).json(err);
  }

};

export const getCurrentUserData = async (req: Request, res: Response) => {
  try{
    const userList = await getUserData(req.body.email);

    if (!userList) {
      throw new Error('Unable to get user info')
    }
    res.json(userList);

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

export const deleteExistingUser = async (req: Request, res: Response) => {
  try {
    const { email, delete_options } = req.body;
    const status = await deleteUser(email, delete_options);
    if (!status) {
      throw new Error(
        "Unable to delete you account. Please try after sometime"
      );
    }
    res.json({
      success: true,
      message: "Account deleted successfully !!",
    });
  } catch (err) {
    logger.info("Unable to create new user");
    logger.error(err);
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};
