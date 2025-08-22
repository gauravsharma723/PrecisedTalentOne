import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'precised',
    // password: 'precised@123',
    password: process.env.DB_PASSWORD, // to access db password from .env file
    database: 'precised_talent_db',
    waitForConnections: true,
    connectionLimit: 10,
});

export default pool;
