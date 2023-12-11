import express from 'express';
import { CartManager } from '../CartManager.js'; 
import utils from '../fileUtils.js';

const router = express.Router();
const cartManager = new CartManager('../src/data/carts.json'); 

router.post('/', async (req, res) => {
  try {
    const cartId = await cartManager.createCart();
    res.json({ cartId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity || 1; 
    const result = await cartManager.addProductToCart(cartId, productId, quantity);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
