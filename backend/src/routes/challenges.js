const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/first', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT c.*, con.title as concept_title, con.description as concept_description, 
              con.use_case, con.explanation
       FROM challenges c
       JOIN concepts con ON c.concept_id = con.id
       LIMIT 1`
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No challenges found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `SELECT c.*, con.title as concept_title, con.description as concept_description, 
              con.use_case, con.explanation
       FROM challenges c
       JOIN concepts con ON c.concept_id = con.id
       WHERE c.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
