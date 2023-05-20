import { Pool, QueryConfig, QueryResult } from "pg";
import { initializeConnection } from "../config/db";
import { IUserInfo, TDeleteOptions } from "../types";
import { Name } from "ajv";

//* For getting all the users data

export const listUsers = async (): Promise<unknown[]> => {
  const db: Pool = await initializeConnection();

  const listStatusResult: QueryResult = await db.query(
    "SELECT * FROM ecom.users WHERE account_status = true ORDER BY id ASC"
  );
  return listStatusResult.rows;
};

//* For getting a specific user data

export const getUserData = async (userEmail: string): Promise<IUserInfo[]> => {
  const db: Pool = await initializeConnection();
  const queryResult = await db.query(
    "SELECT * FROM ecom.users WHERE email = $1",
    [userEmail]
  );

  return queryResult.rows;
};

//* For adding a new user

export const addNewUser = async (userinfo: IUserInfo): Promise<unknown> => {
  const db: Pool = await initializeConnection();

  const isUserAvailable = await getUserData(userinfo.email);

  if (isUserAvailable.length === 0) {
    const query: QueryConfig = {
      text: `
            INSERT INTO ecom.users(name,email,password)
            VALUES($1::text,$2::text,$3::text)
            `,
      values: [userinfo.name, userinfo.email, userinfo.password],
    };

    return await db.query(query);
  } else {
    throw {
      reason: `User with email ${userinfo.email} already exists in the database`,
    };
  }
};

//* For deleting a existing user

export const deleteUser = async (userEmail: string,delete_options:TDeleteOptions) => {
  const db: Pool = await initializeConnection();
  const { permanently, temporarily } = delete_options;
  if(permanently){
    return await db.query("DELETE FROM ecom.users WHERE email = $1", [userEmail]);
  }
  if(temporarily){
    return await db.query(`
    UPDATE ecom.users SET account_status = $2 
    WHERE email = $1
    `, [userEmail,false]);
  }
};

// Account details update

