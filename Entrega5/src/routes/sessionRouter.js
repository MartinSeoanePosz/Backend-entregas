import express from 'express';
import User from '../dao/mongo/users.js';
import { auth } from '../middleware/index.js';

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await User.findOne({ email, password });

  if (result === null) {
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
});
router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  const newUser = {
    email,
    password,
    role: "user",
  };
  console.log(email);

  const result = await User.create({
    email,
    password,
    role: "user",
  });

  if (result === null) {
    res.status(400).json({
      error: "Error creating user",
    });
  } else {
    req.session.user = email;
    req.session.role = newUser.role || "user";
    res.status(201).json({
      respuesta: "User created successfully",
    });
  }
});
router.post('/logout', (req, res) => {
  console.log('Logging out user:', req.session.user);
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Redirect to the login page after successful logout
      res.redirect('/login');
    }
  });
});

export default router;