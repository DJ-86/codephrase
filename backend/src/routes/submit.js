const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { challengeId, passed } = req.body;
    const userId = req.user.userId;

    if (passed) {
      // Save to user_progress
      await db.query(
        `INSERT INTO user_progress (user_id, concept_id, completed, attempts, completed_at)
         SELECT $1, concept_id, true, 1, NOW()
         FROM challenges
         WHERE id = $2
         ON CONFLICT (user_id, concept_id) DO UPDATE
         SET completed = true, completed_at = NOW()`,
        [userId, challengeId]
      );
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;