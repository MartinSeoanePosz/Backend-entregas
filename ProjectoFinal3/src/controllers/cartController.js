import { CartRepository } from '../repositories/cartRepository.js';

const cartRepository = new CartRepository();

const cartController = {
  getAllCarts: async (req, res) => {
    try {
      const allCarts = await cartRepository.getAll();
      res.json(allCarts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createCart: async (req, res) => {
    const { email, timestamp, products } = req.body;
    try {
      const response = await cartRepository.create({ email, timestamp, products });
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getCartById: async (req, res) => {
    try {
      const cartId = req.params.id;
      const cart = await cartRepository.getById(cartId);
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
      const response = await cartRepository.update(id, { email, timestamp, products });
      res.json(response);
    } catch (error) {
      console.error(error);
    }
  },

  deleteCartProducts: async (req, res) => {
    const { id } = req.params;
    const response = await cartRepository.deleteAllProductsInCart(id);
    res.json(response);
  },

  addProductToCart: async (req, res) => {
    const { id, pid } = req.params;
    const { quantity } = req.body;
    try {
      const response = await cartRepository.addProductToCart(id, pid, quantity);
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  removeProductFromCart: async (req, res) => {
    const { id, pid } = req.params;
    try {
      const cart = await cartRepository.getById(id);
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      const productIndex = cart.products.findIndex(product => product.productId === pid);
      if (productIndex === -1) {
        return res.status(404).json({ error: 'Product not found in cart' });
      }
      if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity -= 1;
      } else {
        cart.products.splice(productIndex, 1);
      }
      await cart.save();
  
      res.json({ message: 'Product removed from cart' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  purchaseCartById: async (req, res) => {
    try {
      const cartId = req.params.id;
      const cart = await cartRepository.getById(cartId);
      res.render('cartPurchase', { title: 'Purchase', style: '../css/cart.css', cart: cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

export default cartController;
