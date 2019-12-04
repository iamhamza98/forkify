import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/**
* GLOBAL STATE OBJECT
**/
const state = {};



/**
* SEARCH CONTROLLER
**/
const controlSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput(); // TODO from User side
  //console.log(query);

  if(query){
  // 2. New Search Object and add to the state
  state.search = new Search(query);

  try {
    // 3. Prepare UI for result (loading sign or delete previous result etc.)
    searchView.clearInput();
    searchView.clearResList();
    renderLoader(elements.searchRes);
    // 4. Search for recipes
    await state.search.getResults();

    // 5. Render result on UI
    clearLoader();
    searchView.renderResult(state.search.recipes);
  }
  catch(err) {
    alert(`Something is wrong for searcing.`);
    clearLoader();
  }
  }
};




elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPage.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');

  if(btn) {
  const goToPage = parseInt(btn.dataset.goto, 10);
  searchView.clearResList();
  searchView.renderResult(state.search.recipes, goToPage);
}
});




/**
* RECIPE CONTROLLER
**/

const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');

  if(id) {
    // 1. Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // highlight Selected item
    if(state.search) searchView.highlightSelected(id);

    // 2. Create New recipe object
    state.recipe = new Recipe(id);

    try {
      // 3. Get recipe data and parseIngredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // 4. Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServing();

      // 5. Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    }
    catch(err) {
      alert(`Error processing recipes.`);
      console.log(err);
    }
  }
};

  ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Hndling Servings and Ingredients
  elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
      //Decrease btn
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
    else if(e.target.matches('.btn-increase, .btn-increase *')){
    //Increase btn
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
    }
    console.log(state.recipe);
  }
)
