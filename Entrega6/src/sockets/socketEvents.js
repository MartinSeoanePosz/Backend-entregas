import ProductDBManager from '../dao/dbManager/products.js';
import MessageDBManager from '../dao/dbManager/messages.js';

const productManager = new ProductDBManager();
const messageManager = new MessageDBManager();

const handleProductSocketEvents = (socket) => {
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
