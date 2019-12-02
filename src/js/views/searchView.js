import {elements} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResList = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPage.innerHTML = '';
}

const limitRecipeTitle = (title, limit = 17) => {
  let newTitle = [];
  if(title.length > limit){
      title.split(' ').reduce((a, b) => {
        if(a+b.length <= limit){
          newTitle.push(b);
        }
        return a + b.length;
      }, 0);
      return `${newTitle.join('')}...`
  }
  return title;
};

const renderRecipe = recipe => {
  const markup =`
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
  `;

  elements.searchResList.insertAdjacentHTML('beforeEnd', markup);
      };

const creatBtn = (page, type) => `

<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
</button>
`;



const renderBtn = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

    let btn;
    if(page === 1 && pages > 1) {
      // only next btn
      btn = creatBtn(page, 'next');
    }
    else if(page < pages) {
      // both btns
      btn = `
      ${creatBtn(page, 'prev')}
      ${creatBtn(page, 'next')}
      `;
    }
    else if(page === pages && pages > 1){
      // only prev btn
      btn = creatBtn(page, 'prev');
    }

    elements.searchResPage.insertAdjacentHTML('afterbegin', btn);
};


export const renderResult = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage; // 2 - 1 *5
  const end = resPerPage * page; //5

  recipes.slice(start, end).forEach(renderRecipe);
  renderBtn(page, recipes.length, resPerPage);
};
