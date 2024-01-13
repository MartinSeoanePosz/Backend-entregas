import { Router } from 'express';
// import { ProductManager } from '../classes/ProductManager.js';
// import { CartManager } from '../classes/CartManager.js';
import ProductDBManager from '../dao/dbManager/products.js';
import CartDBManager from '../dao/dbManager/carts.js';


const router = Router();
// const productManager = new ProductManager('products.json');
const productManager = new ProductDBManager();

router.get("/products", async (req, res) => {
    const products = await productManager.getAll();
    res.render("products", {
      title: "Listado de productos",
      products: products,
      style: "css/products.css",
    });
  });
  
  router.get("/realtime", async (req, res) => {
    const products = await productManager.getAll();
    res.render("realtime", {
      title: "Productos en tiempo real",
      products: products,
      style: "css/products.css",
    });
  });
export default router;