const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient');


// RECIPE ROUTES // 
// I.N.D.U.C.E.S 
  
  // INDEX
  router.get('/', async (req, res) => {
   try {
    const allRecipes = await Recipe.find().populate('ingredients');
    console.log(allRecipes)
    res.render('recipes/index.ejs', {
        recipes: allRecipes 
    });
   } catch (error) {
     console.log(error)
     res.redirect('/')
   }
   
   
  });
  
  // NEW
  router.get('/new', async (req, res) => {
    try {
      const ingredients = await Ingredient.find();
      res.render('recipes/new.ejs', { ingredients });
    } catch (err) {
      console.error('Error loading ingredients:', err);
      res.redirect('/');
    }
  });

  // CREATE 
  router.post('/', async (req, res) => {
    try {
      const newRecipe = new Recipe({
        name: req.body.name,
        instructions: req.body.instructions,
        user: req.session.user._id,
        ingredients: Array.isArray(req.body.ingredients)
          ? req.body.ingredients
          : req.body.ingredients ? [req.body.ingredients] : []
      });
  
      await newRecipe.save();
      res.redirect('/recipes');
    } catch (err) {
      console.error('Error creating recipe:', err);
      res.redirect('/');
    }
  });
  

  // DELETE
  router.delete('/:recipeId', async (req, res) => {
    try {
      await Recipe.findByIdAndDelete(req.params.recipeId);
      res.redirect('/recipes');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      res.redirect('/recipes');
    }
  });
  
// UPDATE
router.put('/:recipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) return res.status(404).send('Recipe not found');
    recipe.name = req.body.name;
    recipe.instructions = req.body.instructions;
    recipe.ingredients = Array.isArray(req.body.ingredients)
      ? req.body.ingredients
      : req.body.ingredients ? [req.body.ingredients] : [];

    // Ensure user field still exists
    recipe.user = recipe.user || req.session.user._id;
    await recipe.save();
    res.redirect('/recipes');
  } catch (err) {
    console.error('Error updating recipe:', err);
    res.status(500).send('Failed to update recipe');
  }
});


// EDIT
router.get('/:recipeId/edit', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    const ingredients = await Ingredient.find();
    res.render('recipes/edit.ejs', { recipe, ingredients });
  } catch (err) {
    console.error('Error loading edit form:', err);
    res.redirect('/');
  }
});


// SHOW ROUTE
router.get('/:recipeId', async (req, res) => {
    try {
      const foundRecipe = await Recipe.findById(req.params.recipeId)  
        res.render('recipes/show.ejs', {
            recipe: foundRecipe,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


  module.exports = router 
