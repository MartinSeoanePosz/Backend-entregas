import { ticketModel } from '../dao/models/ticket.js';
import { CartRepository } from '../repositories/cartRepository.js';
import { ProductRepository } from '../repositories/productRepository.js';

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();

export const generateTicket = async (req, res) => {
    try {
        const { cartId } = req.session;
        const cartData = await cartRepository.getById(cartId);

        let purchasedProducts = [];
        let unpurchasedProducts = [];

        for (const productEntry of cartData.products) {
            const productId = productEntry.productId;
            const quantityInCart = productEntry.quantity;

            const productData = await productRepository.getById(productId);

            if (productData && productData.stock >= quantityInCart) {
                purchasedProducts.push({ productId, quantity: quantityInCart });
            } else {

                unpurchasedProducts.push({ productId, quantity: quantityInCart });
            }
        }

        const newTicket = new ticketModel({
            cart: cartData._id,
            purchaser: req.session.user,
            products: purchasedProducts
        });
        await newTicket.save();

        cartData.products = unpurchasedProducts;
        await cartRepository.update(cartId, { products: unpurchasedProducts });

        res.status(201).json({
            message: 'Ticket generated successfully',
            ticket: newTicket
        });
    } catch (error) {
        console.error('Error generating ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
