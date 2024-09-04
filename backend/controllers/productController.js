"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
// Mock data for demonstration purposes
var products = [
    { id: 1, name: 'Apple', price: 1.00 },
    { id: 2, name: 'Banana', price: 0.50 },
    // Add more products as needed
];
var getProducts = function (req, res) {
    // Fetch products from the database or other data source
    res.json(products);
};
exports.getProducts = getProducts;
