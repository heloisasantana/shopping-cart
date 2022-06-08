const fetchItem = async (id) => {
  const requestAPIfromID = await fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
    return requestAPIfromID;
  };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
