import express from 'express';
import CartDBManager from '../dao/dbManager/carts.js';
// import utils from '../fileUtils.js';

const router = express.Router();
// const cartManager = new CartManager('../src/carts.json'); 
const carts = new CartDBManager();

router.get('/', async (req, res) => {
  try {
    const allCarts = await carts.getAll();
    res.json(allCarts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/', async (req, res) => {
  const { email, timestamp, products } = req.body;
  try {
    const response = await carts.save({ email, timestamp, products });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const cartId = req.params.id;
    const cart = await carts.getById(cartId);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, timestamp, products } = req.body;
  try {
    const response = await carts.update(id, { email, timestamp, products });
    res.json(response);
  } catch (error) {
    console.error(error);
  }
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await carts.delete(id);
  res.json(response);
});
router.post('/:id/product/:pid', async (req, res) => {
  const { id, pid } = req.params;
  const { quantity } = req.body;
  try {
    const response = await carts.addProductToCart(id, pid, quantity);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;

// router.post('/', async (req, res) => {
//   try {
//     const cartId = await cartManager.createCart();
//     res.json({ cartId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.get('/:cid', async (req, res) => {
//   try {
//     const cartId = parseInt(req.params.cid);
//     const cart = await cartManager.getCartById(cartId);
//     res.json(cart);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/:cid/product/:pid', async (req, res) => {
//   try {
//     const cartId = parseInt(req.params.cid);
//     const productId = parseInt(req.params.pid);
//     const quantity = req.body.quantity || 1; 
//     const result = await cartManager.addProductToCart(cartId, productId, quantity);
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// });

// export default router;
