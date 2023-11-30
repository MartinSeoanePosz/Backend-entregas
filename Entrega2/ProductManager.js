import { createFile, readFile, updateFile, deleteFile } from "./fileSystem.js";
import fs from "fs";
const FILE_NAME = "./products.txt";

export default class ProductManager {
  async getProducts() {
    try {
      if (fs.existsSync(FILE_NAME)) {
        const fileContent = await fs.promises.readFile(FILE_NAME, "utf-8");
        if (fileContent.trim() === "") {
          console.log(`File ${FILE_NAME} is empty.`);
          return [];
        }
        return JSON.parse(fileContent);
      } else {
        console.log(`File ${FILE_NAME} does not exist.`);
        return [];
      }
    } catch (error) {
      console.error('Error reading or parsing the file:', error.message);
      throw error;
    }
  }
  
  async addProduct({ title, description, price, thumbnail, code, stock }) {
    try {
      let products = await this.getProducts();
      if (
        title === undefined ||
        description === undefined ||
        price === undefined ||
        thumbnail === undefined ||
        code === undefined ||
        stock === undefined
      ) {
        throw new Error("All fields are required");
      }
      let existingProduct = products.find((product) => product.code === code);
      if (existingProduct) {
        console.log("Product with the same code already exists. Not adding a new product.");
      } else {
        const newProduct = {
          id: products.length + 1,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        products.push(newProduct);
        console.log("Product added successfully.");
      }
      await fs.promises.writeFile(FILE_NAME, JSON.stringify(products, null, 2), "utf-8");
  
    } catch (error) {
      console.error('Error adding product:', error.message);
      throw error;
    }
  } 
  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === id);
      if (product) {
        return product;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error('Error getting product by ID:', error.message);
      throw error;
    }
  }

  async updateProductById(id, { title, description, price, thumbnail, code, stock }) {
    try {
      let products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
  
      if (productIndex !== -1) {
        const updatedProduct = {
          id,
          title: title || products[productIndex].title,
          description: description || products[productIndex].description,
          price: price || products[productIndex].price,
          thumbnail: thumbnail || products[productIndex].thumbnail,
          code: code || products[productIndex].code,
          stock: stock || products[productIndex].stock,
        };
  
        products[productIndex] = updatedProduct;
        await fs.promises.writeFile(FILE_NAME, JSON.stringify(products), "utf-8");
  
        console.log(`Product with ID ${id} updated successfully.`);
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error('Error updating product by ID:', error.message);
      throw error;
    }
  }

  async removeProductById(id) {
    try {
      let products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
  
      if (index !== -1) {
        products.splice(index, 1);
        await fs.promises.writeFile(FILE_NAME, JSON.stringify(products), "utf-8");
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error('Error removing product by ID:', error.message);
      throw error;
    }
  }
}
