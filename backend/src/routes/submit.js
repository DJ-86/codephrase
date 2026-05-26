const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { challengeId, code, passed } = req.body;
    const userId = req.user.userId;

    if (passed) {
      // Save to submissions with code
      await db.query(
        `INSERT INTO submissions (user_id, challenge_id, code, passed)
         VALUES ($1, $2, $3, $4)`,
        [userId, challengeId, code || '', passed]
      );
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;