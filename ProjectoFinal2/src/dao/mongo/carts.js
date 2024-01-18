import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    email: { type: String, required: true },
    timestamp: { type: Date, default: Date.now, required: true },
    products: [{
        productId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            },
        quantity: { type: Number, default: 0 }
    }]
});

export const cartModel = mongoose.model(cartCollection, cartSchema);