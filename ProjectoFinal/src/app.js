import express from 'express';
import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
