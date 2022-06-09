const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const fatherCart = document.querySelector('.cart');
const fatherCartItems = document.querySelector('.cart__items');

let sum = 0; 
const sumItemsCart = createCustomElement('h4', 'total-price', sum);
fatherCart.appendChild(sumItemsCart);

const buttonClearCart = document.querySelector('.empty-cart');
buttonClearCart.addEventListener('click', () => {
// Referência utilizada para usar o innerHTML = '' para remover os elementos filhos dessa <ol> (Ordered List): https://pt.stackoverflow.com/questions/441373/como-remover-todos-os-elementos-de-uma-div-em-javascript#:~:text=Para%20remover%20de%20uma%20s%C3%B3,do%20elemento%20pelo%20valor%20fornecido;
  fatherCartItems.innerHTML = '';
  sumItemsCart.innerText = (Math.round((sum -= sum) * 100) / 100);
}); 

const cartItemClickListener = (event) => {
  fatherCartItems.removeChild(event.target);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // Referência utilizada para inserir Math.round(number * 100)/100 para obter duas casas decimais e não utilizar o toFixed, conforme solicitado pelo requisito 9: https://metring.com.br/arredondar-numero-em-javascript;
  sumItemsCart.innerText = (Math.round(sum += salePrice * 100) / 100);
  li.addEventListener('click', cartItemClickListener);
  li.addEventListener('click', () => {
  sumItemsCart.innerText = (Math.round(sum -= salePrice * 100) / 100);
  });
  return li;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
  .addEventListener('click', async () => {
    const pickedItem = await fetchItem(sku);
    const objItem = { sku: pickedItem.id, name: pickedItem.title, salePrice: pickedItem.price };
    fatherCartItems.appendChild(createCartItemElement(objItem));
  });
  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const showingResults = async (products) => {
    const fatherItems = document.querySelector('.items');
    return fetchProducts(products)
    .then((data) => data.results
    .forEach((product) => {
    const objProduct = { sku: product.id, name: product.title, image: product.thumbnail };
    fatherItems.appendChild(createProductItemElement(objProduct));
    }));
  };

  window.onload = () => {
  showingResults('computador');
};
