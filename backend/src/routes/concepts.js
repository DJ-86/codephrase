const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    try {
        const result = await db.query(
            `SELECT id, slug, title, description, difficulty, "order"
            FROM concepts
            ORDER BY "order" ASC`
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

router.get('/:slug/challenges', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const result = await db.query(
      `SELECT ch.id, ch.title, ch.description, co.slug as concept_slug
       FROM challenges ch
       JOIN concepts co ON ch.concept_id = co.id
       WHERE co.slug = $1
       ORDER BY ch.id`,
      [slug]
    );
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;