require('dotenv').config();
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
);

module.exports = { db };