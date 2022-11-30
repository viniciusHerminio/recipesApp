export const drinksAPI = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint).then((res) => res.json());
  return response;
};

export const drinksCategoryAPI = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint).then((res) => res.json());
  return response;
};
