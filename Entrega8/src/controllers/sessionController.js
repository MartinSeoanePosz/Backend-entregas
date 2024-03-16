import passport from 'passport';
import User from '../dao/models/users.js';
import { CartRepository } from '../repositories/cartRepository.js';
import { ProductRepository } from '../repositories/productRepository.js';
import { hashPassword, isValidPassword } from '../fileUtils.js';
import { UserDTO } from '../dao/dto/userDTO.js';

const cartRepository = new CartRepository();
const productManager = new ProductRepository();

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

      let cart = await cartRepository.getById(result.cart);
      if (!cart) {
        const newCart = await cartRepository.add({ userId: result._id });
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

      if (result.role === 'user') {
        return res.redirect('/products');
      } else if (result.role === 'admin') {
        return res.redirect('/realtime');
      }

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
  
      const cart = await cartRepository.getById(currentUser.cart);
  
      const userInfo = new UserDTO(currentUser);
  
      res.render('current', { title: 'Current', style: '../css/current.css', userInfo });
    } catch (error) {
      console.error("Error retrieving current user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  modifyProducts: async (req, res) => {
    const products = await productManager.getAll();
    res.render("realtime", {
      title: "Add or remove products",
      products: products,
      style: "../css/products.css",
    });
  },
};


export default sessionController;
