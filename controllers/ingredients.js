const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient.js');


// INGREDIENT ROUTES // 
// I.N.D.U.C.E.S 

// ROOT/HOME
  
  // INDEX
  router.get('/', async (req, res) => {
    const allIngredients = await Ingredient.find()
    console.log(allIngredients)
    res.render('ingredients/index.ejs', {
        allIngredients: allIngredients
    })
  })
  
  //NEW
  router.get('/new', (req, res) => {
    res.render('ingredients/new.ejs')
  })
  
//   // DELETE
//   router.delete("/ingredients/:ingredientId", async (req, res) => {
//     await Ingredient.findByIdAndDelete(req.params.ingredientId);
//     res.redirect("/ingredients");
//   });
  
//   // UPDATE
//   router.put("/ingredients/:ingredientId", async (req, res) => {
//     // TBD
    
//     // Update the ingredient in the database
//     await Ingredient.findByIdAndUpdate(req.params.ingredientId, req.body);
  
//     // Redirect to the ingredient's show page to see the updates
//     res.redirect(`/ingredients/${req.params.ingredientId}`);
//   });
  
//   // CREATE 
//   router.post('/ingredients', async (req, res) => {
//     // if (req.body.PLACEHOLDER === 'on') {
//     //     req.body.PLACEHOLDER = true;
//     // } else {
//     //     req.body.PLACEHOLDER = false;
//     // }
//     await Ingredient.create(req.body)
//     console.log(req.body)
//     res.redirect('/ingredients')
//   })
  
//   // EDIT
//   router.get("/ingredients/:ingredientId/edit", async (req, res) => {
//     const foundIngredient = await Ingredient.findById(req.params.ingredientId);
//     res.render("ingredients/edit.ejs", {
//       ingredient: foundIngredient,
//     });
//   });
  
  module.exports = router