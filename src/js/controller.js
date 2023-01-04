import 'core-js/stable';
import { async } from 'regenerator-runtime';
import 'regenerator-runtime/runtime';

import * as model from './model';
import { MODAL_CLOSE_TIMEOUT } from './confid';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpiner();

    resultsView.update(model.getSearchResultPage());

    // update bookmarks
    bookmarksView.update(model.state.bookmarks);

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
    resultsView.render(model.getSearchResultPage());

    // render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    // console.log(err);
  }
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

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpiner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    // change ID
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // window.history.back() стрілочка щоб повернути назад
    // window.history.forward() вперед

    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_TIMEOUT * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandleSearch(controlSearchResults);
  paginationView.addHandlerCkick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
