import utils from "../fileUtils.js";

export class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }
  async addProduct(title, description, price, thumbnail, code, category, stock) {

    if (
      title == undefined ||
      description == undefined ||
      price == undefined ||
      thumbnail == undefined ||
      code == undefined ||
      category == undefined ||
      stock == undefined

    ) {
      console.log("Product data:", title, description, price, thumbnail, code, category, stock);

      throw new Error("All fields are required");
    }
    try {
      let data = await utils.readFile(this.path);
      console.log(data);
      this.products = data?.length > 0 ? data : [];
    } catch (error) {
      console.error('Error adding product:', error.message);
    }

    let codeExists = this.products.some((dato) => dato.code == code);

    if (codeExists) {
      throw new Error("Code already exists, please verify");
    } else {
      const newProduct = {
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        category,
        stock,
      };
      this.products.push(newProduct);
      console.log(this.products.length);
      try {
        await utils.writeFile(this.path, this.products);
      } catch (error) {
        console.log(error);
      }
    }
  }
  async getProducts() {
    try {
      let data = await utils.readFile(this.path);
      this.products = data;
      return data?.length > 0 ? this.products : "There are no products";
    } catch (error) {
      console.log(error);
    }
  }
  async getProductById(id) {
    try {
      let data = await utils.readFile(this.path);
      this.products = data?.length > 0 ? data : [];
      let product = this.products.find((dato) => dato.id === id);

      if (product !== undefined) {
        return product;
      } else {
        return "Requested product doesn't exists";
      }
    } catch (error) {
      console.log(error);
    }
  }
  async updateProductById(id, data) {
    try {
      let products = await utils.readFile(this.path);
      this.products = products?.length > 0 ? products : [];

      let productIndex = this.products.findIndex((dato) => dato.id === id);
      if (productIndex !== -1) {
        this.products[productIndex] = {
          ...this.products[productIndex],
          ...data,
        };
        await utils.writeFile(this.path, products);
        return {
          mensaje: "Product updated.",
          producto: this.products[productIndex],
        };
      } else {
        return { mensaje: "Requested product doesn't exists" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById(id) {
    try {
      // console.log("Deleting product with ID:", id);
      // console.log("Products before deletion:", this.products);
      // console.log("Products from file before reading:", this.products);
      let products = await utils.readFile(this.path);
      console.log("Products from file after reading:", products);
      this.products = products?.length > 0 ? products : [];
      console.log("Products after reading:", this.products);
      let productIndex = this.products.findIndex((product) => product.id === +id);
      console.log("Product index:", productIndex);
      if (productIndex !== -1) {
        console.log("Deleting product:")
        let product = this.products[productIndex];      
        this.products.splice(productIndex, 1);
        await utils.writeFile(this.path, products);
        return { message: "Product deleted", product: product };
      } else {
        return { message: "Requested product doesn't exists" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  
}
