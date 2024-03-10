import mongoose from "mongoose";
import { generateUniqueCode } from "../../helpers/codeGenerator.js";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    purchase_datetime: { type: Date, default: Date.now, required: true },
    code: { type: String, unique: true },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    totalAmount: { type: Number, default: 0 },
    purchaser: { type: String, required: true },
});

ticketSchema.pre('save', async function(next) {
    try {
        const Cart = mongoose.model('carts');
        const cart = await Cart.findById(this.cart);
        
        if (!cart) {
            throw new Error('Cart not found');
        }
        
        let totalAmount = 0;
        cart.products.forEach(product => {
            totalAmount += product.quantity;
        });
        
        this.totalAmount = totalAmount;
        next();
    } catch (error) {
        next(error);
    }
});

ticketSchema.pre('save', async function(next) {
    try {
        const Ticket = mongoose.model('tickets');
        let code = '';
        let isCodeUnique = false;
        
        while (!isCodeUnique) {
            code = generateUniqueCode();
            const existingTicket = await Ticket.findOne({ code });
            if (!existingTicket) {
                isCodeUnique = true;
            }
        }
        
        this.code = code;
        next();
    } catch (error) {
        next(error);
    }
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);

