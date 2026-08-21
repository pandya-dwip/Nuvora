import productsData from '../data/products.json';

export const getProducts = () => {
  return productsData;
};

export const getProductById = (id) => {
  return productsData.find((product) => product.id === Number(id));
};
