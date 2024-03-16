import express from 'express';
import {listOfProducts} from '../helpers/mockProducts.js';

const router = express.Router();

router.get('/', (req, res) => {
    const products = [];
    for (let i = 0; i < 10; i++) {
        products.push(listOfProducts());
    }
    res.json({
        data: products,
        count: products.length,
    });
});

export default router;