import mongoose from 'mongoose';
import Product from '../models/Product.js';

let fallbackProducts = [
  {
    id: 1,
    title: 'Smart Headphones',
    description: 'Immersive audio with noise cancellation.',
    price: 129,
    category: 'Electronics',
    stock: 15,
    status: 'In Stock'
  },
  {
    id: 2,
    title: 'Ergo Chair',
    description: 'Comfort-focused seating for long work sessions.',
    price: 189,
    category: 'Furniture',
    stock: 8,
    status: 'Low Stock'
  },
  {
    id: 3,
    title: 'Wireless Mouse',
    description: 'Responsive control with a long battery life.',
    price: 49,
    category: 'Accessories',
    stock: 20,
    status: 'In Stock'
  }
];

const useMongo = () => mongoose.connection.readyState === 1;

const getFilteredProducts = (search, page, limit) => {
  const query = search ? search.toLowerCase() : '';
  const filtered = fallbackProducts.filter((product) => {
    const values = [product.title, product.description, product.category, product.status];
    return values.some((value) => value?.toLowerCase().includes(query));
  });

  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit);

  return {
    products: filtered.slice(start, end),
    total: filtered.length,
    page: Number(page),
    limit: Number(limit)
  };
};

export const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    if (!useMongo()) {
      return res.json(getFilteredProducts(search, page, limit));
    }

    const query = search ? { title: { $regex: search, $options: 'i' } } : {};
    const products = await Product.find(query).limit(Number(limit)).skip((Number(page) - 1) * Number(limit));
    const total = await Product.countDocuments(query);

    res.json({ products, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    if (!useMongo()) {
      const product = fallbackProducts.find((item) => item.id === Number(req.params.id));
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json(product);
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    if (!useMongo()) {
      const newProduct = {
        id: fallbackProducts.length ? fallbackProducts[fallbackProducts.length - 1].id + 1 : 1,
        ...req.body,
        price: Number(req.body.price || 0),
        stock: Number(req.body.stock || 0)
      };
      fallbackProducts.push(newProduct);
      return res.status(201).json(newProduct);
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    if (!useMongo()) {
      const productIndex = fallbackProducts.findIndex((item) => item.id === Number(req.params.id));
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
      }

      fallbackProducts[productIndex] = { ...fallbackProducts[productIndex], ...req.body, id: Number(req.params.id) };
      return res.json(fallbackProducts[productIndex]);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    if (!useMongo()) {
      const initialLength = fallbackProducts.length;
      fallbackProducts = fallbackProducts.filter((item) => item.id !== Number(req.params.id));
      if (fallbackProducts.length === initialLength) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json({ message: 'Product deleted successfully' });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
