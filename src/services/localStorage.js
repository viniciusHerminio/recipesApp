export const saveFav = (recipe) => {
  localStorage.setItem('favoriteRecipes', recipe);
};

export const getFavs = () => JSON
  .parse(localStorage.getItem('favoriteRecipes'));
