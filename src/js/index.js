import Search from './models/Search';

const state = {};

const controlSearch = async () => {
  // 1. Get query from view
  const query = "pizza" // TODO from User side

  // 2. New Search Object and add to the state
  state.search = new Search(query);

  // 3. Prepare UI for result (loading sign or delete previous result etc.)

  // 4. Search for recipes
  await state.search.getResults();

  // 5. Render result on UI
  console.log(state.search.recipes);
}

document.querySelector('.search').addEventListener('submit', e=>{
  e.preventDefault();
  controlSearch();
})
