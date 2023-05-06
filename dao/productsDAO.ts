import { Pool, QueryConfig, QueryResult } from "pg";
import { initializeConnection } from "../config/db";

export const getProductsDataByCategory = async(categoryId:number)=>{
    const db: Pool = await initializeConnection();
    const query: QueryConfig = {
        text: `SELECT * from ecom.products WHERE category_id = $1`,
        values: [categoryId]
    };
    const result: QueryResult = await db.query(query);
    return result.rows;
}