import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now, required: true },
    products: [
        {
            id: Number,
            title: String,
            description: String,
            price: Number,
            thumbnail: String,
            code: String,
            category: String,
            stock: Number
        },
    ],
    });

export const cartModel = mongoose.model(cartCollection, cartSchema);