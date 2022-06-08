const fetchProducts = async (products) => {
  const requestAPI = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${products}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
  return requestAPI;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
