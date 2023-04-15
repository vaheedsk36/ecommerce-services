import { Pool, PoolClient, PoolConfig } from 'pg';
import { env } from 'process';
import { logger } from '../middlewares/logger';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({
    encoding: 'utf8',
    path: resolve(process.cwd(), '.env'),
});

const poolConfig: PoolConfig = {
    host: env.DB_HOST,
    port: +(env.DB_PORT),
    user: env.DB_USER_NAME,
    password: env.DB_USER_PASSWORD,
    database: env.DATABASE,
    idleTimeoutMillis: 5000,
    max: 1000, // As node-postgres it self use 10 max connections, so to provide unlimited connections, it is being set to 1000
    ssl: false,
    connectionTimeoutMillis: 10000,
    application_name: env.npm_package_name,
};

const pool: Pool = new Pool(poolConfig);

pool.on('error', (err: Error) => {
    logger.error(err);
});

export const initializeConnection = async (): Promise<Pool> => {
    logger.info(`New db connection is established!!`);
    console.log(pool,'pool')
    return pool;
};

export const releaseConnection = async (client: PoolClient) => {
    logger.info(`Connection release is : ${await client.release(true)}`);
};