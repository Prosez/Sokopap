"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var dotenv_1 = require("dotenv");
// Load environment variables from the .env file
dotenv_1.default.config();
// Retrieve environment variables
var databaseUrl = process.env.DATABASE_URL;
// Create a new Sequelize instance using the database URL
var sequelize = new sequelize_1.Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false, // Disable logging if you don't need it
});
exports.default = sequelize;
