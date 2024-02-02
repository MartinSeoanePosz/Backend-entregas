import express from 'express';
import User from '../dao/models/users.js';
import { auth } from '../middleware/index.js';
import passport from 'passport';
import { hashPassword, isValidPassword } from '../fileUtils.js';



const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {

    const result = await User.findOne({ email });
    
    if (result === null) {
      res.status(400).json({
        error: "Wrong credentials",
      });
    } else if (!isValidPassword(result.password, password)) {
      res.status(400).json({
        error: "Wrong credentials",
      });
      
    } else {
      req.session.user = email;
      req.session.role = result.role;
      
      res.cookie('userData', JSON.stringify({ user: email, role: result.role }), { httpOnly: true, maxAge: 20000});
      console.log( "result:", result.email, result.role)
      
      res.status(200).json({
        respuesta: "ok",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(400).json({ error: "Wrong credentials" });
  }});
router.post("/signup",
  (req, res, next) => {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        console.error("Error during registration:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!user) {
        return res.status(400).json({ error: "User already exists" });
      }
      return res.status(201).json({ respuesta: "User created successfully" });
    })(req, res, next);
  }
);

router.post('/logout', (req, res) => {
  console.log('Logging out user:', req.session.user);
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.redirect('/login');
    }
  });
});
router.get("/failRegister", (req, res) => {
  res.status(400).json({
    error: "Error creating user",
  });
});

export default router;