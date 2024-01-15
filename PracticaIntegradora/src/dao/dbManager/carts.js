import { cartModel } from "../mongo/carts.js";

export default class CartDBManager {
    constructor() {
        this.cartModel = cartModel;
    }

    async getAll() {
        try {
            const carts = await this.cartModel.find();
            return carts;
        } catch (error) {
            console.log(error);
        }
    }
    async getById(id) {
        try {
            if (id) {
                const cart = await this.cartModel.findById(id);
                return cart;
            } else {
                const carts = await this.cartModel.find();
                return carts;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async add(data) {
        try {
            const newCart = new this.cartModel(data);
            const cart = await newCart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
    async save(data) {
        try {
            const newCart = new this.cartModel(data);
            const cart = await newCart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, data) {
        try {
            const cart = await this.cartModel.findByIdAndUpdate(id, data);
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const cart = await this.cartModel.findByIdAndDelete(id);
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
    async addProductToCart(cartId, productId) {
        try {
            
            const cart = await this.cartModel.findById(cartId);
            if (!cart) {
                console.log("Cart not found");
                return null; 
        }
        const existingProductIndex = cart.products.findIndex(product => product.productId === productId);
        
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            cart.products.push({
                productId: productId,
                quantity: 1,
            });
        }
        cart.markModified('products');
        const updatedCart = await cart.save();
        return updatedCart;
    } catch (error) {
        console.log(error);
        return null;
    }
    }
}