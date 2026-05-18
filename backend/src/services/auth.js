const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const authService = {
    register: async (email, password, username) => {
        const existingUser = await db.query('SELECT id FROM users WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            throw new Error('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.query(
            'INSERT INTO users (email, password_hash, username) VALUES ($1, $2, $3) RETURNING id, email, username',
            [email, hashedPassword, username]
        );

        const user = result.rows[0];

        const token = jwt.sign({
            userId: user.id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: '7d'}
        );

        return {user, token} ;
        },

    login: async (email, password) => {
        const result = await db.query(
            'SELECT id, email, username, password_hash FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            throw new Error ('User not found')
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            throw new Error ('Invalid password');
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return { user: {id: user.id, email: user.email, username: user.username }, token};

    }    
};

module.exports = authService;