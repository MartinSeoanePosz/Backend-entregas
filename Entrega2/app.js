import { createFile, readFile, updateFile, deleteFile } from './fileSystem.js';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager();

// Carga productos desde el archivo si existe
async function loadProductsFromFile() {
  try {
    const fileContent = await readFile();
    const existingProducts = JSON.parse(fileContent);
    existingProducts.forEach(product => productManager.addProduct(product.title, product.description, product.price, product.thumbnail, product.code, product.stock));
  } catch (error) {
    console.log("Error loading products from file", error);
  }
}
loadProductsFromFile();

// Productos
const product1 = {
  title: "Producto 1",
  description: "Descripcion 1",
  price: 100,
  thumbnail: "noThumbnail1.png",
  code: "P1",
  stock: 10,
};
const product2 = {
  title: "Producto 2",
  description: "Descripcion 2",
  price: 200,
  thumbnail: "noThumbnail2.png",
  code: "P2",
  stock: 20,
};
const product3 = {
  title: "Producto 3",
  description: "Descripcion 3",
  price: 300,
  thumbnail: "noThumbnail3.png",
  code: "P3",
  stock: 30,
};

// productos a agregar
productManager.addProduct(product1.title, product1.description, product1.price, product1.thumbnail, product1.code, product1.stock);
productManager.addProduct(product2.title, product2.description, product2.price, product2.thumbnail, product2.code, product2.stock);
productManager.addProduct(product3.title, product3.description, product3.price, product3.thumbnail, product3.code, product3.stock);

// Actualiza el doc con todos los productos agregados
updateFile(JSON.stringify(productManager.getProduct(), null, 2));

// Producto a actualizar
const productToUpdate = {
  id: 2,
  title: "Updated Product 2",
  description: "Updated Description 2",
  price: 250,
  thumbnail: "updatedThumbnail2.png",
  code: "P2",
  stock: 25,
};

// Actualiza un producto
productManager.updateProductById(productToUpdate.id, productToUpdate);
updateFile(JSON.stringify(productManager.getProduct(), null, 2));

// Borra 1 producto
const productIdToDelete = 3;

productManager.removeProductById(productIdToDelete);
deleteFile()
  .then(() => {
    return new Promise((resolve) => setTimeout(resolve, 500));
  })
  .then(() => {
    return createFile(JSON.stringify(productManager.getProduct(), null, 2));
  })
  .catch((error) => {
    console.log("Error during file operations", error);
  });
