import express from 'express';
import viewsController from '../controllers/viewsController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get("/products", auth, viewsController.viewAllProducts);
router.post("/api/add-to-cart/:productId", viewsController.addToCart);
router.get("/realtime", viewsController.viewRealtimeProducts);
router.get("/cart/:cid", viewsController.viewCartProducts);
router.get("/chat", viewsController.viewChat);

export default router;
