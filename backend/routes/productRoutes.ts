import express from 'express';
import { getProducts } from '../controllers/productController';

const router = express.Router();

// Define routes and link them to controller functions
router.get('/products', getProducts);

export default router;
