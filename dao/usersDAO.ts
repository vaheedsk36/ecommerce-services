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

export const getUserData = async() : Promise<unknown[]>=>{
    const db: Pool = await initializeConnection();
    const listUsersSql = `
    INSERT INTO ecom.users(id,name,email,password,created_at,updated_at)
    VALUES()
    `;

    const query: QueryConfig = {
        text: listUsersSql
    };

    const listStatusResult: QueryResult<any>= await db.query(
        query
    );
    return listStatusResult.rows;

}

export const addNewUser = async(userinfo:any) : Promise<unknown>=>{
    const db: Pool = await initializeConnection();
    // TODO Check if a user exists already or not
    const query: QueryConfig = {
        text: `
        INSERT INTO ecom.users(id,name,email,password)
        VALUES($1::text,$2::text,$3::text)
        `,
        values: [
            userinfo.name,
            userinfo.email,
            userinfo.password
        ],

    };

    return await db.query(query);

}

// INSERT INTO TABLE QUERY

// INSERT INTO ecom.users(id,name,email,password,created_at,updated_at)
// VALUES()
// `;