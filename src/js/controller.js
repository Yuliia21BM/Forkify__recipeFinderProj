import 'core-js/stable';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';

import icons from '../img/icons.svg';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpiner();

    // load recipe
    await model.loadRecipe(id);

    // const recipe = model.state.recipe;

    // rendering
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpiner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    // render
    resultsView.render(model.state.search.results);
  } catch (err) {}
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandleSearch(controlSearchResults);
};
init();
