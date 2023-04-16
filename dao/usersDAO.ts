import { Pool, QueryConfig, QueryResult } from "pg";
import { initializeConnection } from "../config/db";
import { IUserInfo } from "../types";

export const listUsers = async (): Promise<unknown[]> => {
  const db: Pool = await initializeConnection();

  const listStatusResult: QueryResult<any> = await db.query(
    "SELECT * FROM ecom.users ORDER BY id ASC"
  );
  return listStatusResult.rows;
};

export const getUserData = async (userEmail: string): Promise<IUserInfo[]> => {
  const db: Pool = await initializeConnection();
  const queryResult = await db.query(
    "SELECT * FROM ecom.users WHERE email = $1",
    [userEmail]
  );

  return queryResult.rows;
};

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

  

