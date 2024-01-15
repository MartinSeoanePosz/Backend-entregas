import { productModel } from "../mongo/products.js";

export default class ProductDBManager {
    constructor() {
        this.productModel = productModel;
    }

    async getAll() {
        try {
            const products = await this.productModel.find().lean();
            return products;
        } catch (error) {
            console.log(error);
        }
    }
    async getById(id) {
        try {
            if (id) {
                const product = await this.productModel.findById(id).lean();
                return product;
            } else {
                const products = await this.productModel.find();
                return products;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async save(data) {
        try {
            const newProduct = new this.productModel(data);
            const product = await newProduct.save();
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, data) {
        try {
            const product = await this.productModel.findByIdAndUpdate(id, data);
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const product = await this.productModel.findByIdAndDelete(id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }
}