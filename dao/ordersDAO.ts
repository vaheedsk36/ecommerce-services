import { Pool, QueryConfig, QueryResult } from "pg";
import { initializeConnection } from "../config/db";

export const addItemsToCart = async (
    customerId:number,
    productId:number,
    quantity:number,
    unitPrice:number,
    status:string,
): Promise<boolean> => {
    const db: Pool = await initializeConnection();
    const upsertCartItemsSQL = `
        INSERT INTO ecom.orders
        (
            customer_id,
            product_id,
            quantity,
            unit_price,
            status
        )
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (customer_id,product_id)
        DO UPDATE SET quantity = EXCLUDED.quantity + orders.quantity,
        status = EXCLUDED.status
    `;
    const query: QueryConfig = {
        text: upsertCartItemsSQL,
        values: [
            customerId,
            productId,
            quantity,
            unitPrice,
            status
        ]
    };

    const result: QueryResult = await db.query(query);
    return !!result.rowCount;
  };

export const getOrderHistory = async(customerId:number)=>{
    const db: Pool = await initializeConnection();
    const query: QueryConfig = {
        text: `SELECT * from ecom.orders WHERE customer_id = $1 AND status = 'delivered' `,
        values: [customerId]
    };
    const result: QueryResult = await db.query(query);
    return result.rows;
}