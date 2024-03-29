import User from '../dao/models/users.js';
import CartDBManager from '../dao/dbManager/carts.js';
import passport from 'passport';
import { hashPassword, isValidPassword } from '../fileUtils.js';

const cartManager = new CartDBManager();

const sessionController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await User.findOne({ email });

      if (!result || !isValidPassword(result.password, password)) {
        return res.status(400).json({
          error: "Wrong credentials",
        });
      }

      let cart = await cartManager.getById(result.cart);
      if (!cart) {
        const newCart = await cartManager.add({ userId: result._id });
        cart = newCart;
      }
      if (!result.cart.includes(cart._id)) {
        result.cart.push(cart._id)
        await result.save();
      }
      req.session.cartId = cart._id;
      req.session.user = email;
      req.session.role = result.role;

      res.cookie('userData', JSON.stringify({ user: email, role: result.role, cart: req.session.cartId }), { httpOnly: true, maxAge: 20000 });

      res.status(200).json({
        respuesta: "ok",
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(400).json({ error: "Wrong credentials" });
    }
  },

  signup: (req, res, next) => {
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
  },

  logout: (req, res) => {
    console.log('Logging out user:', req.session.user);
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.redirect('/login');
      }
    });
  },

  failRegister: (req, res) => {
    res.status(400).json({
      error: "Error creating user",
    });
  },

  githubLogin: (req, res) => {
  },

  githubCallback: (req, res) => {
    const email = req.user.email;
    const role = req.user.role;

    req.session.user = email;
    req.session.role = role;

    res.cookie('userData', JSON.stringify({ user: email, role }), { httpOnly: true, maxAge: 20000 });

    res.redirect("/products");
  },

  getCurrentUser: async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ error: "User not logged in" });
      }
      const currentUser = await User.findOne({ email: req.session.user });

      if (!currentUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const userInfo = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        age: currentUser.age,
        email: currentUser.email,
        role: currentUser.role,
        cart: currentUser.cart
      };

      res.render('current', { title: 'Current', style: '../css/current.css', userInfo });
    } catch (error) {
      console.error("Error retrieving current user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default sessionController;
