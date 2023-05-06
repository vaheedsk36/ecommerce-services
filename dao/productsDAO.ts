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

export const getProductsDataById = async(id:number)=>{
    const db: Pool = await initializeConnection();
    const query: QueryConfig = {
        text: `SELECT * from ecom.products WHERE id = $1`,
        values: [id]
    };
    const result: QueryResult = await db.query(query);
    return result.rows;
}
// TODO facing error with the query here
export const addProductsToDb = async(
    name:string,
    description:string,
    price:number,
    assetUrl:string,
    categoryId:number,
    quantity:number,
    sellerDetails:string,
    category:string,
    specifications:string
)=>{
    const db: Pool = await initializeConnection();
    const productsUpsertQuery = 
    `
    INSERT INTO ecom.products (
        name,
        description,
        price,
        asset_url,
        category_id,
        quantity,
        seller_details,
        category,
        specifications)

        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (name)
        DO NOTHING
    `
    const query: QueryConfig = {
        text: productsUpsertQuery,
        values: [
            name,
            description,
            price,
            assetUrl,
            categoryId,
            quantity,
            sellerDetails,
            category,
            specifications
        ]
    };
    const result: QueryResult = await db.query(query);
    return !!result.rowCount;
}