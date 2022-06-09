const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  test('Testa se a função saveCartItems com o parâmetro "<ol><li>Item</li></ol>", faz o método localStorage.setItem ser chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  })

  test('Testa se a função saveCartItems com o parâmetro "<ol><li>Item</li></ol>", faz o método localStorage.setItem ser chamado com dois parâmetros: cartItems e "<ol><li>Item</li></ol>"', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  })
});
