import { ticketModel } from '../dao/models/ticket.js';
import { CartRepository } from '../repositories/cartRepository.js';

const cartRepository = new CartRepository();

export const generateTicket = async (req, res) => {
    try {
        const { cartId } = req.session;

        // Retrieve cart data based on cartId
        const cartData = await cartRepository.getById(cartId);

        // Create a new ticket based on the cart data
        const newTicket = new ticketModel({
            cart: cartData._id,
            purchaser: req.session.user // Assuming user information is stored in the session
        });

        // Save the ticket to the database
        await newTicket.save();

        res.status(201).json({ message: 'Ticket generated successfully', ticket: newTicket });
    } catch (error) {
        console.error('Error generating ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
