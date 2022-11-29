const drinksAPI = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint).then((res) => res.json());
  return response;
};

export default drinksAPI;
