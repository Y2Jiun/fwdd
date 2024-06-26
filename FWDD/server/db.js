// server/db.js
const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Default user for XAMPP
    password: '', // Default password is empty for XAMPP
    database: 'fwdd'
});

// Test the database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Successfully connected to the database');
        connection.release(); // Release the connection back to the pool
    }
});

module.exports = pool.promise();
