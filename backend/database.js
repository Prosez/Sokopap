"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from the .env file
dotenv_1.default.config();
// Retrieve environment variables
const databaseUrl = process.env.DATABASE_URL;
// Create a new Sequelize instance using the database URL
const sequelize = new sequelize_1.Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false, // Disable logging if you don't need it
});
exports.default = sequelize;
