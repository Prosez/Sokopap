"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var productController_1 = require("../controllers/productController");
var router = express_1.default.Router();
// Define routes and link them to controller functions
router.get('/products', productController_1.getProducts);
exports.default = router;
