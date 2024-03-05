import express from 'express';
import sessionController from '../controllers/sessionController.js';
import { auth } from '../middleware/index.js';
import passport from 'passport';

const router = express.Router();

router.post("/login", sessionController.login);
router.post("/signup", sessionController.signup);
router.post('/logout', sessionController.logout);
router.get("/failRegister", sessionController.failRegister);
router.get("/github", sessionController.githubLogin);
router.get("/githubcallback", passport.authenticate("github", { failureRedirect: "/login" }), sessionController.githubCallback);
router.get("/current", sessionController.getCurrentUser);

export default router;
