import express from 'express';
import ProductDBManager from '../dao/dbManager/products.js';
import MessageDBManager from '../dao/dbManager/messages.js';
import CartDBManager from '../dao/dbManager/carts.js';

const router = express.Router();
const productManager = new ProductDBManager();
const messageManager = new MessageDBManager();
const cartManager = new CartDBManager();

// View all products
router.get("/products", async (req, res) => {
    const products = await productManager.getAll();
    res.render("products", {
      title: "Listado de productos",
      products: products,
      style: "../css/products.css",
    });
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