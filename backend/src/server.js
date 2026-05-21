const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/challenges', require('./routes/challenges'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/verify', require('./routes/verify'));
app.use('/api/progress', authMiddleware, require('./routes/progress'));
app.use('/api/submit', require('./routes/submit'));
app.use('/api/concepts', require('./routes/concepts'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});