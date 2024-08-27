import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Retrieve environment variables
const databaseUrl = process.env.DATABASE_URL as string;

// Create a new Sequelize instance using the database URL
const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false, // Disable logging if you don't need it
});

export default sequelize;
