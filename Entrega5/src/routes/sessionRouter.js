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
    req.session.role = "admin" || "user";
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

router.get("/products", auth, (req, res) => {
  res.render("products", {
    title: "products",
    user: req.session.user,
    role: req.session.role,
  });
});
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      res.redirect('/login');
    }
  });
});

export default router;