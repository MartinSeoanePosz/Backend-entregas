import CartDBManager from '../dao/dbManager/carts.js';

const carts = new CartDBManager();

const cartController = {
  getAllCarts: async (req, res) => {
    try {
      const allCarts = await carts.getAll();
      res.json(allCarts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createCart: async (req, res) => {
    const { email, timestamp, products } = req.body;
    try {
      const response = await carts.save({ email, timestamp, products });
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getCartById: async (req, res) => {
    try {
      const cartId = req.params.id;
      const cart = await carts.getById(cartId);
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateCart: async (req, res) => {
    const { id } = req.params;
    const { email, timestamp, products } = req.body;
    try {
      const response = await carts.update(id, { email, timestamp, products });
      res.json(response);
    } catch (error) {
      console.error(error);
    }
  },

  deleteCartProducts: async (req, res) => {
    const { id } = req.params;
    const response = await carts.deleteAllProductsInCart(id);
    res.json(response);
  },

  addProductToCart: async (req, res) => {
    const { id, pid } = req.params;
    const { quantity } = req.body;
    try {
      const response = await carts.addProductToCart(id, pid, quantity);
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  removeProductFromCart: async (req, res) => {
    const { id, pid } = req.params;
    try {
      const response = await carts.removeProductFromCart(id, pid);
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export default cartController;
