import { Request, Response } from 'express';

// Mock data for demonstration purposes
const products = [
    { id: 1, name: 'Apple', price: 1.00 },
    { id: 2, name: 'Banana', price: 0.50 },
    // Add more products as needed
];

export const getProducts = (req: Request, res: Response) => {
    // Fetch products from the database or other data source
    res.json(products);
};
