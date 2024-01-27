import express from 'express';
import ProductDBManager from '../dao/dbManager/products.js';

const router = express.Router();
const products = new ProductDBManager();

router.get('/', async (req, res) => {
  try {
    const allProducts = await products.getAll();
    res.json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/', async (req, res) => {
  const { title, description, price, thumbnail, code, category, stock } = req.body;
  try {
    const response = await products.save({ title, description, price, thumbnail, code, category, stock });
    res.json(response);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await products.getById(id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price, thumbnail, code, category, stock } = req.body;
  try {
    const response = await products.update(id, { title, description, price, thumbnail, code, category, stock });
    res.json(response);
  } catch (error) {
    console.error(error);
  }
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await products.delete(id);
  res.json(response);
});

export default router;