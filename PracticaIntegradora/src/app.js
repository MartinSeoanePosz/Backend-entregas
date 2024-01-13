import express from 'express';
import { Server } from "socket.io";
import { __dirname } from './fileUtils.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import handlebars from "express-handlebars";
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from "./routes/viewsRouter.js";
// import { ProductManager } from "./classes/ProductManager.js";
import ProductDBManager from './dao/dbManager/products.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8090;
const productManager = new ProductDBManager();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/ecommerce";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/", viewsRouter);

const server = app.listen(PORT, () => {
  console.log("Server is running in port: " + PORT);
});

const socketServer = new Server(server);

socketServer.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("addProduct", async (product) => {
    const title = product.title;
    const description = product.description;
    const price = product.price;
    const thumbnail = product.thumbnail;
    const code = product.code;
    const category = product.category;
    const stock = product.stock;
    try {
      const result = await productManager.save(
        title,
        description,
        price,
        thumbnail,
        code,
        category,
        stock
      );
      const allProducts = await productManager.getAll();
      console.log(allProducts);
      result && socketServer.emit("update", allProducts);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("delete", async (id, callback) => {
    console.log("Server received delete request for ID:", id);
    try {
      await productManager.delete(id);
      const allProducts = await productManager.getAll(); // Read products after deletion
      callback({ mensaje: "Product deleted" });
      socketServer.emit("updateProducts", allProducts);
    } catch (err) {
      console.log("Error during deletion:", err);
      callback({ mensaje: "Error deleting product" });
    }
  });
  socket.on("updateProducts", (products) => {
    console.log("Received updateProducts event:", products);
    getAll(products);
  });
  
});

mongoose.connect(DB_URL).then(() => {
  console.log("Base de datos conectada");
}) .catch((err) => {
  console.log("Error: ", err);
});
