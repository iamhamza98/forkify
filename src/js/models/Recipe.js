import axios from 'axios';

export default class Recipe {
  constructor(id){
    this.id = id;
  }

  async getRecipe() {
    try{
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.image = res.data.recipe.image_url;
      this.ingredients = res.data.recipe.ingredients;
      this.author = res.data.recipe.publisher;
      this.url = res.data.recipe.source_url;
    }
    catch(error){
      alert(`We can not get recipes right now.`);
    }
  }
    calcTime() {
      // Asumming that take 15min for 3 ingredients
      const numIng = this.ingredients.length;
      const periods = Math.ceil(numIng / 3);
      this.time = periods * 15;
    }

    calcServing() {
      this.serving = 4; //TO DO
  }

    parseIngredients() {
      const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'cups', 'teaspoons', 'teaspoon', 'pounds'];
      const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'cup', 'tsp', 'tsp', 'pound'];
      const units = [...unitsShort, 'kg', 'g'];

      const newIngredients = this.ingredients.map(el => {
        // 1. Uniform units
        let ingredient = el.toLowerCase();

        unitsLong.forEach((unit, i) => {
          ingredient = ingredient.replace(unit, units[i]);
        });

        // 2. Remove parentheses
          ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

        // 3. Parse ingredients into counts, unit and ingredient
         const arrIng = ingredient.split(' ');
         const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

         let objIng;
         if(unitIndex > -1){
           // There is units
           //EX 4 1/2 cup, arrCount [4, 1/2] --> eval([4+1/2]) => 4.5
           //EX 4 cup, arrCount [4]
           const arrCount = arrIng.slice(0, unitIndex);

           let count;
           if(unitIndex.length === 1){
              // 2
              count = eval(arrIng[0].replace('-', '+'));
           }
           else {
              // 4 1/2
              count = eval(arrIng.slice(0, unitIndex).join('+'));
           }

           objIng = {
             count,
             unit: arrIng[unitIndex],
             ingredient: arrIng.slice(unitIndex + 1).join(' ')
           }
         }
         else if(parseInt(arrIng[0], 10)){
           // There is NO unit, but number in 1st position
           objIng = {
             count: parseInt(arrIng[0], 10),
             unit: '',
             ingredient: arrIng.slice(1).join(' ')
           }
         }
         else if(unitIndex === -1){
           // There is NO unit and number in 1st position
           objIng = {
             count: 1,
             unit: '',
             ingredient
           }
         }

         return objIng;
      });

      this.ingredients = newIngredients;
  }

    updateServings(type) {
      //servings
      const newServing = type === 'dec' ? this.serving - 1 : this.serving + 1;

      //ingredients
      this.ingredients.forEach(ing => {
        ing.count *= (newServing / this.serving);
      });

      this.serving = newServing;
    }
};
