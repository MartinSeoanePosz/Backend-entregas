import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render(
        'login', 
        {title: 'Login',
        style: '../css/login.css',
    });
});

export default router;