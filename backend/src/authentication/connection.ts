// import mysql from 'mysql2'
import {Pool} from 'pg'
import dotenv from "dotenv";

dotenv.config();
// const conn = mysql.createPool({
//     user: process.env.DB_USER,
//     password: process.env.USER_PASSWORD,
//     database: process.env.DATABASE
// }).promise()
const conn=new Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.USER_PASSWORD,
    database:process.env.DATABASE,
    port:Number(process.env.DB_PORT),
    ssl: {
        rejectUnauthorized: false, // accept self-signed or AWS certs
      },
}
)
export default conn