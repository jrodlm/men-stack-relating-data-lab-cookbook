const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require("path");
const session = require('express-session');
const Recipe = require('./models/recipe')

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const recipesController = require('./controllers/recipes.js');
const authController = require('./controllers/auth.js');
const ingredientsController = require('./controllers/ingredients.js');
const userController = require('./controllers/users');

const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use('/users', userController);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/recipes', recipesController);
app.use('/ingredients', ingredientsController);

app.get('/', (req, res) => {
  res.render('home.ejs', {
    user: req.session.user,
  });
});

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});




// INGREDIENT ROUTES // 
// I.N.D.U.C.E.S 

// ROOT/HOME
app.get('/', async (req, res) => {
  res.render('home.ejs')
})

// INDEX
app.get('/ingredients', async (req, res) => {
  const allIngredients = await Ingredient.find()
  console.log(allIngredients)
  res.render('ingredients/index.ejs', {
      allIngredients: allIngredients
  })
})

//NEW
app.get('/ingredients/new', (req, res) => {
  res.render('ingredients/new.ejs')
})

// DELETE
app.delete("/ingredients/:ingredientId", async (req, res) => {
  await Ingredient.findByIdAndDelete(req.params.ingredientId);
  res.redirect("/ingredients");
});

// UPDATE
app.put("/ingredients/:ingredientId", async (req, res) => {
  // TBD
  
  // Update the ingredient in the database
  await Ingredient.findByIdAndUpdate(req.params.ingredientId, req.body);

  // Redirect to the ingredient's show page to see the updates
  res.redirect(`/ingredients/${req.params.ingredientId}`);
});

// CREATE 
app.post('/ingredients', async (req, res) => {
  // if (req.body.PLACEHOLDER === 'on') {
  //     req.body.PLACEHOLDER = true;
  // } else {
  //     req.body.PLACEHOLDER = false;
  // }
  await Ingredient.create(req.body)
  console.log(req.body)
  res.redirect('/ingredients')
})

// EDIT
app.get("/ingredients/:ingredientId/edit", async (req, res) => {
  const foundIngredient = await Ingredient.findById(req.params.ingredientId);
  res.render("ingredients/edit.ejs", {
    ingredient: foundIngredient,
  });
});

