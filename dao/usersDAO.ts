import { Pool, QueryConfig, QueryResult } from "pg";
import { initializeConnection } from "../config/db";

export const listUsers = async (): Promise<unknown[]> => {
    const db: Pool = await initializeConnection();
    const listUsersSql = `
    SELECT * FROM ecom.users
    ORDER BY id ASC
    `;

    const query: QueryConfig = {
        text: listUsersSql
    };

    const listStatusResult: QueryResult<any>= await db.query(
        query
    );
    return listStatusResult.rows;
};

export const getUserData = async(userinfo) : Promise<unknown[]>=>{
    const db: Pool = await initializeConnection();
    const queryResult = await db.query(
        'SELECT * FROM ecom.users WHERE email = $1',
        [userinfo.email]
      );

    return queryResult.rows;
}

export const addNewUser = async(userinfo:any) : Promise<unknown>=>{
    const db: Pool = await initializeConnection();

    const isUserAvailable = await getUserData(userinfo)

    if(isUserAvailable.length === 0){

        const query: QueryConfig = {
            text: `
            INSERT INTO ecom.users(name,email,password)
            VALUES($1::text,$2::text,$3::text)
            `,
            values: [
                userinfo.name,
                userinfo.email,
                userinfo.password
            ],
    
        };
    
        return await db.query(query);

    } else {
        throw { reason: `User with email ${userinfo.email} already exists in the database`};
    }

}