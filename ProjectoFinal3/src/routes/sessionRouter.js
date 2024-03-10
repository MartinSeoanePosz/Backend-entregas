import express from 'express';
import sessionController from '../controllers/sessionController.js';
import cartController from '../controllers/cartController.js';
import { generateTicket } from '../controllers/ticketController.js';
import passport from 'passport';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post("/login", sessionController.login);
router.post("/signup", sessionController.signup);
router.post('/logout', sessionController.logout);
router.get("/failRegister", sessionController.failRegister);
router.get("/github", sessionController.githubLogin);
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), sessionController.githubCallback);
router.get("/current", sessionController.getCurrentUser);
router.get("/realtime", auth, sessionController.modifyProducts);
router.get('/:id/purchase', cartController.purchaseCartById);
router.post('/generate-ticket', generateTicket);

export default router;
