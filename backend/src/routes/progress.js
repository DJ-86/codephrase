const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Get total concepts
    const totalResult = await db.query('SELECT COUNT(*) as total FROM concepts');
    const total = parseInt(totalResult.rows[0].total);

    // Get completed concepts (where user passed all challenges)
    const completedResult = await db.query(
      `SELECT COUNT(DISTINCT c.id) as completed
       FROM concepts c
       WHERE (
         SELECT COUNT(*)
         FROM challenges ch
         WHERE ch.concept_id = c.id
           AND ch.id IN (
             SELECT DISTINCT challenge_id
             FROM submissions
             WHERE user_id = $1 AND passed = true
           )
       ) = (
         SELECT COUNT(*)
         FROM challenges ch2
         WHERE ch2.concept_id = c.id
       )
       AND (SELECT COUNT(*) FROM challenges WHERE concept_id = c.id) > 0`,
      [userId]
    );

    const completed = parseInt(completedResult.rows[0].completed) || 0;

    res.json({
      completed,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;