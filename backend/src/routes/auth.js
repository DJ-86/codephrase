const express = require('express');
const router = express.Router();
const authService = require('../services/auth');

router.post('/register', async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const result = await authService.register(email, password, username);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password, username } = req.body;
        const result = await authService.login(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({error: error.message});
    }
})

module.exports = router;