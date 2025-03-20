const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

// name, instructions,

// RECIPE ROUTES // 
// I.N.D.U.C.E.S 

// ROOT/HOME
  
  // INDEX
  router.get('/', async (req, res) => {
    res.render('recipes/index.ejs');
  });
  
  
  // NEW
  router.get('/new', (req, res) => {
    res.render('recipes/new.ejs')
  })

  // CREATE 
router.post('/', async (req, res) => {
    try {
      const newRecipe = new Recipe(req.body);
      newRecipe.owner = req.session.user._id;
      await newRecipe.save();
      res.redirect('/recipes')
    } catch (error) {
        console.log(error)
        res.redirect('/')
      // Handle errors
    }
  
//     // Example of an access control check
// if (recipe.owner.equals(req.session.user._id)) {
//     // Proceed with edit or delete operation
//   } else {
//     // Redirect or show an error message
//   }
  
  });
  
  
//   // DELETE
//   router.delete("/recipes/:recipeId", async (req, res) => {
//     await Recipe.findByIdAndDelete(req.params.recipeId);
//     res.redirect("/recipes");
//   });
  
//   // UPDATE
//   router.put("/recipes/:recipeId", async (req, res) => {
//     // TBD
    
//     // Update the recipe in the database
//     await Recipe.findByIdAndUpdate(req.params.recipeId, req.body);
  
//     // Redirect to the recipe's show page to see the updates
//     res.redirect(`/recipes/${req.params.recipeId}`);
//   });
  


  
//   // EDIT
//   router.get("/recipes/:recipeId/edit", async (req, res) => {
//     const foundRecipe = await Recipe.findById(req.params.recipeId);
//     res.render("recipes/edit.ejs", {
//       recipe: foundRecipe,
//     });
//   });

  module.exports = router 
