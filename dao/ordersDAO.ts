import { Pool, QueryConfig, QueryResult } from "pg";
import { initializeConnection } from "../config/db";

export const addItemsToCart = async (
    customerId: number,
    productId: number,
    quantity: number,
    unitPrice: number,
    status: string,
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

export const getOrderHistory = async (customerId: number) => {
    const db: Pool = await initializeConnection();
    const query: QueryConfig = {
        text: `SELECT * from ecom.orders WHERE customer_id = $1 AND status = 'delivered' `,
        values: [customerId]
    };
    const result: QueryResult = await db.query(query);
    return result.rows;
}

export const updateCartOnPurchase = async (
    item: any
) => {
    const db: Pool = await initializeConnection();
    const updateCartOnPurchaseSQL = `
    UPDATE 
        ecom.orders
    SET 
        quantity = quantity - $3 
    WHERE
        customer_id=$1 AND 
        product_id=$2 AND
        status = 'in_cart';
    `;

    const query: QueryConfig = {
        text: updateCartOnPurchaseSQL,
        values: [
            item.customer_id,
            item.product_id,
            item.quantity
        ]
    };

    const result: QueryResult = await db.query(query);
    return !!result.rowCount;
}

export const getItemsFromCart = async (
    customerId: number
) => {
    const db: Pool = await initializeConnection();
    const getPriceSQL = `
        SELECT 
            product_id, quantity, unit_price 
        FROM
            ecom.orders 
        WHERE 
            customer_id = $1 AND
            status = 'in_cart'
    `;

    const query: QueryConfig = {
        text: getPriceSQL,
        values: [customerId]
    };
    const result: QueryResult = await db.query(query);
    return result.rows;
}

export const addToOrderHistory = async (
    items: any
) => {
    const db: Pool = await initializeConnection();
    const addToHistorySQL = `
        INSERT INTO ecom.order_history(customer_id,product_id,quantity,total_price)
        VALUES${items.map(
        (item) =>
            `(
                ${item.customer_id}, 
                ${item.product_id}, 
                ${item.quantity}, 
                ${item.total_price}
            )`
    )}`;
    const query: QueryConfig = {
        text: addToHistorySQL,
    };

    const result = await db.query(query);
    return !!result.rowCount;
}

export const removeItemFromCartDAO = async (
    customerId: number,
    productId: number
) => {
    const db: Pool = await initializeConnection();
    const removeItemFromCartSQL = `
        DELETE FROM ecom.orders
        WHERE 
            customer_id = $1 AND
            product_id = $2 AND
            status = 'in_cart'
    `;

    const query: QueryConfig = {
        text: removeItemFromCartSQL,
        values: [
            customerId,
            productId
        ]
    };

    const result: QueryResult = await db.query(query);
    return !!result.rowCount;
};

export const removeAllItemsFromCartDAO = async (
    customerId: number
) => {
    const db: Pool = await initializeConnection();
    const removeItemFromCartSQL = `
        DELETE FROM ecom.orders
        WHERE 
            customer_id = $1 AND
            status = 'in_cart'
    `;

    const query: QueryConfig = {
        text: removeItemFromCartSQL,
        values: [
            customerId,
        ]
    };

    const result: QueryResult = await db.query(query);
    return !!result.rowCount;
}
