import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    email: { type: String, required: true },
    timestamp: { type: Date, default: Date.now, required: true },
    products: { type: Array, default: [] }
    });

export const cartModel = mongoose.model(cartCollection, cartSchema);