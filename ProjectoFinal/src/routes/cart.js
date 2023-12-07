import { Router } from "express";
import { readData, writeData } from "../fileUtils.js";

const router = Router();
const CART_FILE = "./src/data/carts.json";
let cartCurrentId = 1;

router.get("/", async (req, res) => {
    try {
        const cartData = await readData(CART_FILE);
        res.json({ message: cartData.length === 0 ? "Cart is empty" : "Cart contents", data: cartData });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/", async (req, res) => {
  try {
    const carts = await readData(CART_FILE);

    if (carts.some((cart) => cart.cartId === cartCurrentId)) {
      while (carts.some((cart) => cart.cartId === cartCurrentId)) {
        cartCurrentId++;
      }
    }
    const newCart = {
      cartId: cartCurrentId,
      products: [],
    };
    carts.push(newCart);
    await writeData(CART_FILE, carts);

    res.status(201).json({ cartId: cartCurrentId });
    cartCurrentId++; 

  } catch (error) {
    console.error("Error creating a new cart:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cartData = await readData(CART_FILE);
      const cart = cartData.find((cart) => cart.cartId == cid);

      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }
      const existingProductIndex = cart.products.findIndex((item) => item.product === pid);
      if (existingProductIndex !== -1) {
          cart.products[existingProductIndex].quantity += 1;
      } else {
          cart.products.push({
              product: pid,
              quantity: 1,
          });
      }
      await writeData(CART_FILE, cartData);

      res.status(201).json({ message: "Product added to the cart", data: cart.products });
  } catch (error) {
      console.error("Error adding product to cart:", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
});







export default router;
