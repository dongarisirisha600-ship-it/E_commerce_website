import products from '../data/products.js';

let productList = [...products];

export function getProductList() {
  return productList;
}

export function getAllProducts(req, res) {
  res.json(getProductList());
}

export function getProductById(req, res) {
  const product = getProductList().find((item) => item.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
}

export function createProduct(req, res) {
  const { title, description, price, category, stock, status } = req.body;

  if (!title || !description || !price || !category) {
    return res.status(400).json({ message: 'Please provide title, description, price, and category.' });
  }

  const newProduct = {
    id: getProductList().length ? getProductList()[getProductList().length - 1].id + 1 : 1,
    title,
    description,
    price: Number(price),
    category,
    stock: Number(stock || 0),
    status: status || 'In Stock'
  };

  productList.push(newProduct);
  res.status(201).json(newProduct);
}

export function updateProduct(req, res) {
  const product = getProductList().find((item) => item.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const updatedProduct = { ...product, ...req.body, id: product.id };
  productList = getProductList().map((item) => (item.id === product.id ? updatedProduct : item));
  res.json(updatedProduct);
}

export function deleteProduct(req, res) {
  const initialLength = getProductList().length;
  productList = getProductList().filter((item) => item.id !== Number(req.params.id));

  if (getProductList().length === initialLength) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ message: 'Product deleted successfully.' });
}
