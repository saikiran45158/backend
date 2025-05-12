import mysql from 'mysql2'
import dotenv from "dotenv";

dotenv.config();
const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.USER_PASSWORD,
    database: process.env.DATABASE
}).promise()
export default pool