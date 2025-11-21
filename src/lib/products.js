import productsData from '../data/products.json';

export function getAllProducts() {
  return productsData.products;
}

export function getProductById(id) {
  return productsData.products.find(product => product.id === id);
}

export function getProductsByCategory(category) {
  return productsData.products.filter(product => product.category === category);
}

export function getFeaturedProducts() {
  return productsData.products.slice(0, 4);
}

export function getSimilarProducts(currentProductId, limit = 4) {
  return getAllProducts()
    .filter(product => product.id !== currentProductId)
    .slice(0, limit);
}