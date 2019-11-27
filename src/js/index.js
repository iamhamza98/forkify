import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';


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

  // 4. Search for recipes
  await state.search.getResults();

  // 5. Render result on UI
  searchView.renderResult(state.search.recipes);
  }
}

elements.searchForm.addEventListener('submit', e=>{
  e.preventDefault();
  controlSearch();
})
