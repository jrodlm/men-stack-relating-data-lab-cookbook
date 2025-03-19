const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

// name, instructions,

// RECIPE ROUTES // 
// I.N.D.U.C.E.S 

// ROOT/HOME
router.get('/', async (req, res) => {
    res.render('index.ejs')
  })
  
  // INDEX
  router.get('/recipes', async (req, res) => {
    const allRecipes = await Recipe.find()
    console.log(allRecipes)
    res.render('recipes/index.ejs', {
        allRecipes: allRecipes
    })
  })
  
  //NEW
  router.get('/recipes/new', (req, res) => {
    res.render('recipes/new.ejs')
  })
  
  // DELETE
  router.delete("/recipes/:recipeId", async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.recipeId);
    res.redirect("/recipes");
  });
  
  // UPDATE
  router.put("/recipes/:recipeId", async (req, res) => {
    // TBD
    
    // Update the recipe in the database
    await Recipe.findByIdAndUpdate(req.params.recipeId, req.body);
  
    // Redirect to the recipe's show page to see the updates
    res.redirect(`/recipes/${req.params.recipeId}`);
  });
  
  // CREATE 
  router.post('/recipes', async (req, res) => {
    // if (req.body.PLACEHOLDER === 'on') {
    //     req.body.PLACEHOLDER = true;
    // } else {
    //     req.body.PLACEHOLDER = false;
    // }
    await Recipe.create(req.body)
    console.log(req.body)
    res.redirect('/recipes')
  })
  
  // EDIT
  router.get("/recipes/:recipeId/edit", async (req, res) => {
    const foundRecipe = await Recipe.findById(req.params.recipeId);
    res.render("recipes/edit.ejs", {
      recipe: foundRecipe,
    });
  });
