import 'core-js/stable';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';

import icons from '../img/icons.svg';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpiner();

    resultsView.update(model.getSearchResultPage());

    // load recipe
    await model.loadRecipe(id);

    // const recipe = model.state.recipe;

    // rendering
    await recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpiner();

    const query = await searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    // render
    resultsView.render(model.getSearchResultPage());

    // render pagination
    paginationView.render(model.state.search);
  } catch (err) {}
};

const controlPagination = function (goToPage) {
  // render NEW
  resultsView.render(model.getSearchResultPage(goToPage));

  // render pagination NEW
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandleSearch(controlSearchResults);
  paginationView.addHandlerCkick(controlPagination);
};
init();
