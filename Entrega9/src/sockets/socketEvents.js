import { ProductRepository } from '../repositories/productRepository.js';
import { MessageRepository } from '../repositories/messagesRepository.js';
import CustomError from '../services/customError.js';
import {generateProductErrorInfo} from '../services/info.js';
import EErrors from '../services/enum.js';

const productManager = new ProductRepository();
const messageManager = new MessageRepository();

const handleProductSocketEvents = (socket) => {
  socket.on("addProduct", async (product) => {
    try{
    const { title, description, price, thumbnail, code, category, stock } = product;
    if (!title || !description || !price || !thumbnail || !code || !category || !stock) {
      throw new CustomError({
        name: "InvalidProduct",
        message: "One or more fields are invalid or missing",
        code: EErrors.INVALID_PRODUCT,
        cause: generateProductErrorInfo(product),
      });
    }
      const result = await productManager.save(product);
      const allProducts = await productManager.getAll();
      console.log(allProducts);
      result && socket.emit("update", allProducts);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("delete", async (id, callback) => {
    console.log("Server received delete request for ID:", id);
    try {
      await productManager.delete(id);
      const allProducts = await productManager.getAll();
      callback({ mensaje: "Product deleted" });
      socket.emit("updateProducts", allProducts);
    } catch (err) {
      console.log("Error during deletion:", err);
      callback({ mensaje: "Error deleting product" });
    }
  });

  socket.on("updateProducts", (products) => {
    console.log("Received updateProducts event:", products);
    getAll();
  });
};

const handleChatSocketEvents = (socket) => {
  let visitas = 0;

  socket.on("new-user", (data) => {
    console.log("Received data from new user:", data);
    console.log("new client connected", data.user);

    socket.user = data.user;
    socket.id = data.id;
    visitas++;
    socket.broadcast.emit("new-user-connected", {
      message: `New user connected: ${visitas}`,
      user: data.user,
    });
  });

  socket.on("message", async (data) => {
    try {
      const user = data.user;
      if (!user) {
        console.error("Error: 'user' is required in the message data.");
        return;
      }
      const savedMessage = await messageManager.save({
        user,
        message: data.message,
        date: new Date().toISOString(),
      });
      socket.emit("messageLogs", [savedMessage]);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });
};

export { handleProductSocketEvents, handleChatSocketEvents };
