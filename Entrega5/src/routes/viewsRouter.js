import express from 'express';
import ProductDBManager from '../dao/dbManager/products.js';
import MessageDBManager from '../dao/dbManager/messages.js';
import CartDBManager from '../dao/dbManager/carts.js';
import  auth  from '../middleware/auth.js';

const router = express.Router();
const productManager = new ProductDBManager();
const messageManager = new MessageDBManager();
const cartManager = new CartDBManager();

// View all products
router.get("/products", auth, async (req, res) => {
  const { page = 1, limit = 9, sortBy = 'price', sortOrder = 'asc', category } = req.query;
  const sessionData = {
    email: req.session.user,
    role: req.session.role,
  };
  console.log('Session:', sessionData);

  try {
      const result = await productManager.getProducts({
          category,
          page,
          limit,
          sortBy,
          sortOrder,
      });
      const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } = result;
      const products = docs;
      const response = {
        status: 'success',
        payload: products,
        totalPages,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
        limit: parseInt(limit),
        page: parseInt(page),
        selectedCategory: category,
        sortBy,
        sortOrder,
      };
  
      // console.log('API Response:', response);

      res.render("products", {
          title: "Product list",
          products,
          style: "../css/products.css",
          hasPrevPage,
          hasNextPage,
          nextPage,
          prevPage,
          limit: parseInt(limit),
          page: parseInt(page),
          selectedCategory: category,
          sortBy,
          sortOrder,
          user: sessionData.email,
          role: sessionData.role,
      });
  } catch (error) {
    console.log('API Error:', error);
    res.status(500).json({
      status: 'error',
      payload: null,
      message: 'Internal Server Error',
    });
  }
  });


  router.post("/api/add-to-cart/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      const email = req.body.email;
  
      // Retrieve or create a cart based on the provided email
      let cart = await cartManager.getByEmail(email);
  
      if (!cart) {
        // Create a new cart if it doesn't exist
        cart = await cartManager.add({ email });
      }
  
      // Add the product to the cart (you might want to handle quantity, etc.)
      await cartManager.addProductToCart(cart._id, productId);
  
      res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// View and add/delete/update products
router.get("/realtime", async (req, res) => {
  const products = await productManager.getAll();
  console.log("products from the database", products);
  res.render("realtime", {
    title: "Productos en tiempo real",
    products: products,
    style: "../css/products.css",
  });
});

// View cart products

router.get("/cart/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const cart = await cartManager.getById(cartId);
  res.render("cart", {
    title: "Carrito",
    cart: cart,
    style: "../css/products.css",
  });
});

// Chat

router.get("/chat", (req, res) => {
  const messages = messageManager.getAll();
  res.render("chat", { 
    title: "Chat", 
    messages: messages,
    style: "../css/chat.css" });
});

export default router;