const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');

// GET /ingredients
router.get('/', async (req, res) => {
  const ingredients = await Ingredient.find();
  res.render('ingredients/index.ejs', { ingredients });
});

// POST /ingredients
router.post('/', async (req, res) => {
  try {
    // Prevent duplicates (case-insensitive)
    const existing = await Ingredient.findOne({ name: new RegExp(`^${req.body.name}$`, 'i') });
    if (existing) {
      return res.redirect('/ingredients'); // optional: show a message
    }

    const ingredient = new Ingredient({ name: req.body.name });
    await ingredient.save();
    res.redirect('/ingredients');
  } catch (err) {
    console.error('Ingredient creation error:', err);
    res.redirect('/ingredients');
  }
});

module.exports = router;
