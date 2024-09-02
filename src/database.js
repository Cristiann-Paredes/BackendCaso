import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const connection = async () => {
    try {
        const db = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME
        });
        console.log('Database connected');
        return db;
    } catch (error) {
        console.log('Error connecting to the database:', error);
    }
};

export default connection;
