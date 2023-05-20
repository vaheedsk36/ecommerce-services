import { Pool, QueryConfig, QueryResult } from "pg";
import { initializeConnection } from "../config/db";

export const getProductsDataByCategory = async (categoryId: number) => {
  const db: Pool = await initializeConnection();
  const query: QueryConfig = {
    text: `SELECT * from ecom.products WHERE category_id = $1`,
    values: [categoryId],
  };
  const result: QueryResult = await db.query(query);
  return result.rows;
};

export const getProductsDataById = async (id: number) => {
  const db: Pool = await initializeConnection();
  const query: QueryConfig = {
    text: `SELECT * from ecom.products WHERE id = $1`,
    values: [id],
  };
  const result: QueryResult = await db.query(query);
  return result.rows;
};

export const addProductsToDb = async (
  name: string,
  description: string,
  price: number,
  assetUrl: string,
  categoryId: number,
  quantity: number,
  sellerDetails: string,
  category: string,
  specifications: string,
  companyId: number
) => {
  const db: Pool = await initializeConnection();
  const productsUpsertQuery = `
    INSERT INTO ecom.products (
        name,
        description,
        price,
        asset_url,
        category_id,
        quantity,
        seller_details,
        category,
        specifications,
        company_id)

        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (name,company_id)
        DO NOTHING
    `;
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
      specifications,
      companyId,
    ],
  };
  const result: QueryResult = await db.query(query);
  return !!result.rowCount;
};

export const updateProductByID = async (
  conditions: string,
  updateParams: string[]
) => {
  const db: Pool = await initializeConnection();
  const query = `
    UPDATE ecom.products SET ${updateParams.join(", ")} 
    WHERE ${conditions}
    `;
  const result: QueryResult = await db.query(query);
  return !!result.rowCount;
};

export const deleteProductByID = async (conditions: string) => {
  const db: Pool = await initializeConnection();
  const query = `
    DELETE FROM ecom.products WHERE ${conditions} AND EXISTS (SELECT 1 FROM ecom.products WHERE ${conditions});
    `;
  const result: QueryResult = await db.query(query);
  return !!result.rowCount;
};
