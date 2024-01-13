import express from 'express';
// import { ProductManager } from '../classes/ProductManager.js';
import ProductDBManager from '../dao/dbManager/products.js';

const router = express.Router();
// const productManager = new ProductManager('../src/products.json');
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


// router.get('/', async (req, res) => {
//   try {
//     const products = await productManager.getProducts();
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.get('/:pid', async (req, res) => {
//   try {
//     const productId = parseInt(req.params.pid);
//     const product = await productManager.getProductById(productId);
//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const { title, description, price, thumbnail, code, category, stock } = req.body;
//     await productManager.addProduct(title, description, price, thumbnail, code, category, stock);
//     res.json({ message: 'Product added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// });

// router.put('/:pid', async (req, res) => {
//   try {
//     const productId = parseInt(req.params.pid);
//     const data = req.body;
//     const result = await productManager.updateProductById(productId, data);
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// });

// router.delete('/:pid', async (req, res) => {
//   try {
//     const productId = parseInt(req.params.pid);
//     const result = await productManager.deleteProductById(productId);
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// });

// export default router;
