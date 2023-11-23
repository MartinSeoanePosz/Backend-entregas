import fs from "fs";
import { createFile, readFile, updateFile, deleteFile } from './fileSystem.js';

const FILE_NAME = './ejemploJSON.txt';

class ProductManager {
  constructor() {
    this.products = [];
    this.loadProducts();
  }

  static correlativeId = 0;

  async loadProducts() {
    try {
      if (fs.existsSync(FILE_NAME)) {
        if (this.products.length === 0) {
          const fileContents = await readFile(FILE_NAME);
  
          this.products = JSON.parse(fileContents);
        }
      }
    } catch (error) {
      console.log("Error while loading the products", error);
    }
  }
  

  //INTENTO 1, CAMBIA TODO EL ARCHIVO POR EL NUEVO PRODUCTO NO AGREGA
  // saveProducts() {
  //   try {
  //     const fileContents = JSON.stringify(this.products, null, 2);
  //     createFile(fileContents, FILE_NAME);
  //     console.log("File updated.");
  //   } catch (error) {
  //     console.log("Error while updating the file", error);
  //   }
  // }
  // INTENTO 2 AGREGA EL PRODUCTO PERO INDEFINIDAMENTE, NO REVISA LOS DATOS QUE NO SE REPITAN
  // saveProducts() {
  //   try {
  //     const fileContents = JSON.stringify(this.products, null, 2);
  //     updateFile(fileContents, FILE_NAME);
  //     console.log("File updated.");
  //   } catch (error) {
  //     console.log("Error while updating the file", error);
  //   }
  // }
  // INTENTO 3, ME TIRA ERROR LEYENDO EL JSON
  saveProducts() {
    try {
        const fileContents = JSON.stringify(this.products, null, 2);

        // Check if the product already exists in the file
        const existingProducts = this.loadProductsSync();
        const isProductInFile = existingProducts.some(existingProduct =>
            this.products.some(newProduct => newProduct.id === existingProduct.id)
        );

        if (!isProductInFile) {
            updateFile(fileContents, FILE_NAME);
            console.log("File updated.");
        } else {
            console.log("Products already exist in the file. No need to save again.");
        }
    } catch (error) {
        console.log("Error while updating the file", error);
    }
}

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("All fields are required");
    }

    const codeExists = this.products.find(product => product.code === code);
    if (codeExists) {
      throw new Error("Product code already exists");
    }

    ProductManager.correlativeId++;

    const newProduct = {
      id: ProductManager.correlativeId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    this.saveProducts();

    return newProduct;
  }
  updateProduct(productId, updatedData) {
    try {
        const index = this.products.findIndex(product => product.id === productId);
        
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedData };
            this.saveProducts();

            console.log(`Product with ID ${productId} updated.`);
        } else {
            console.log(`Product with ID ${productId} not found.`);
        }
    } catch (error) {
        console.error("Error while updating the product", error);
    }
  }
  deleteProduct(productId) {
    try {
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
            this.products.splice(index, 1);
            deleteFile(FILE_NAME);
            setTimeout(() => {
                this.saveProducts();
                console.log(`Product with ID ${productId} deleted and file updated.`);
            }, 1000);
        } else {
            console.log(`Product with ID ${productId} not found.`);
        }
    } catch (error) {
        console.error("Error while deleting the product", error);
    }
}

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (product !== undefined) {
      return product;
    } else {
      throw new Error("Product not found");
    }
  }
}
export default ProductManager;