"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes")); // Import the product routes
// Load environment variables from the .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Use routes
app.use('/api', productRoutes_1.default); // Prefix routes with `/api`
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Test the database connection
database_1.default.authenticate()
    .then(() => {
    console.log('Database connection has been established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
