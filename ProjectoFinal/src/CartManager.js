import fileUtils from "./fileUtils.js";

export class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async createCart() {
    try {
      let data = await fileUtils.readFile(this.path);
      this.carts = data?.length > 0 ? data : [];
    } catch (error) {
      console.error('Error creating cart:', error.message);
    }

    const newCart = {
      id: this.generateCartId(),
      products: [],
    };

    this.carts.push(newCart);

    try {
      await fileUtils.writeFile(this.path, this.carts);
    } catch (error) {
      console.error(error);
    }

    return newCart.id;
  }

  async getCartById(cartId) {
    try {
      let data = await fileUtils.readFile(this.path);
      this.carts = data?.length > 0 ? data : [];
      const cart = this.carts.find((c) => c.id === cartId);

      if (cart !== undefined) {
        return cart;
      } else {
        return "Requested cart doesn't exist";
      }
    } catch (error) {
      console.error(error);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      let data = await fileUtils.readFile(this.path);
      this.carts = data?.length > 0 ? data : [];
      const cartIndex = this.carts.findIndex((c) => c.id === cartId);

      if (cartIndex !== -1) {
        const existingProductIndex = this.carts[cartIndex].products.findIndex(
          (p) => p.id === productId
        );

        if (existingProductIndex !== -1) {
          this.carts[cartIndex].products[existingProductIndex].quantity += quantity;
        } else {
          this.carts[cartIndex].products.push({ id: productId, quantity });
        }

        await fileUtils.writeFile(this.path, this.carts);
        return { message: 'Product added to cart successfully' };
      } else {
        return { message: "Requested cart doesn't exist" };
      }
    } catch (error) {
      console.error(error);
    }
  }

  generateCartId() {
    return Date.now().toString();
  }
}
