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

const fatherCart = document.querySelector('.cart__items');

const cartItemClickListener = (event) => {
  fatherCart.removeChild(event.target);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
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
    fatherCart.appendChild(createCartItemElement(objItem));
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
