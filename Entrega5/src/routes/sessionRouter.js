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
    req.session.role = "admin";
    res.status(200).json({
      respuesta: "ok",
    });
  }
});
router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { first_name, last_name, email, password, age } = req.body;

  const newUser = {
    first_name,
    last_name,
    email,
    password,
    age,
    role: "user",
  };
  console.log(email);

  const result = await User.create({
    first_name,
    last_name,
    age,
    email,
    password,
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

router.get("/private", auth, (req, res) => {
  res.render("private", {
    title: "private",
    user: req.session.user,
  });
});

export default router;