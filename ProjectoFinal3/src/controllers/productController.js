import { ProductRepository } from '../repositories/productRepository.js';

const products = new ProductRepository();

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const allProducts = await products.getAll();
      res.json(allProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createProduct: async (req, res) => {
    const { title, description, price, thumbnail, code, category, stock } = req.body;
    try {
      const response = await products.save({ title, description, price, thumbnail, code, category, stock });
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getProductById: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await products.getById(id);
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { title, description, price, thumbnail, code, category, stock } = req.body;
    try {
      const response = await products.update(id, { title, description, price, thumbnail, code, category, stock });
      res.json(response);
    } catch (error) {
      console.error(error);
    }
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;
    const response = await products.delete(id);
    res.json(response);
  }
};

export default productController;
