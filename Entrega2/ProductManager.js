class ProductManager {
  constructor() {
    this.products = [];
  }
  static correlativeId = 0;

  addProduct(title, description, price, thumbnail, code, stock) {
    if (
      title == undefined ||
      description == undefined ||
      price == undefined ||
      thumbnail == undefined ||
      code == undefined ||
      stock == undefined
    ) {
      throw new Error("All fields are required");
    }
    let codeExists = this.products.find(product => product.code === code);
    if (codeExists) {
      throw new Error("Product code already exists");
    } else {
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
      return newProduct;
    }
  }

  getProduct() {
    return this.products;
  }

  getProductById(id) {
    let product = this.products.find(product => product.id === id);
    if (product !== undefined) {
      return product;
    } else {
      throw new Error("Product not found");
  }
}
}


export default ProductManager;

