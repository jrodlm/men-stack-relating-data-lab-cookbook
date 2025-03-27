const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Recipe = require('../models/recipe'); 


// GET /users — list all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.render('users/index.ejs', { users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.redirect('/');
  }
});

// SHOW ONE USER'S RECIPES
router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const recipes = await Recipe.find({ user: user._id }).populate('ingredients');
      res.render('users/show.ejs', { user, recipes });
    } catch (err) {
      console.error('Error showing user profile:', err);
      res.redirect('/users');
    }
  });


module.exports = router;
