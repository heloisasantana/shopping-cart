require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  test('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  test('Testa se a função fetchItem com o parâmetro "MLB1615760527", faz a função fetch ser chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })

  test('Testa se a função fetchItem com o parâmetro "MLB1615760527", faz  função fetch ser chamada com o endpoint https://api.mercadolibre.com/items/MLB1615760527', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  })

  test('Testa se a função fetchItem com o parâmetro "MLB1615760527", retorna uma estrutura de dados igual ao objeto item', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  })

  test('Testa se a função fetchItem sem parâmetro, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  })
  });
