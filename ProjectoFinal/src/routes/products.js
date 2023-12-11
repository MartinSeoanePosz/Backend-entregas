import express from 'express';
import { ProductManager } from '../ProductManager.js';

const router = express.Router();
const productManager = new ProductManager('../src/data/products.json');

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, category, stock } = req.body;
    await productManager.addProduct(title, description, price, thumbnail, code, category, stock);
    res.json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const data = req.body;
    const result = await productManager.updateProductById(productId, data);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const result = await productManager.deleteProductById(productId);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
