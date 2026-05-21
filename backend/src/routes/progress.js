const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/progress - get user's progress
router.get('/', async (req, res) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

   const result = await db.query(
  `SELECT 
    COUNT(CASE WHEN up.completed = true THEN 1 END) as completed,
    COUNT(DISTINCT c.id) as total
   FROM concepts c
   LEFT JOIN user_progress up ON c.id = up.concept_id AND up.user_id = $1`,
  [userId]
);

    const row = result.rows[0];
    res.json({
      completed: parseInt(row.completed) || 0,
      total: parseInt(row.total) || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;