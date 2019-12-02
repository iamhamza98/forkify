import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';


const state = {};

const controlSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput(); // TODO from User side
  //console.log(query);

  if(query){
  // 2. New Search Object and add to the state
  state.search = new Search(query);

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
