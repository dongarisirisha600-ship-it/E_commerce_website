import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { sendError } from '../utils/errorResponse.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', category = '' } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Product.countDocuments(query);

    res.json({ products, total, page: Number(page), limit: Number(limit) });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, 'Invalid product id.', 400);
    }

    const product = await Product.findById(id);
    if (!product) {
      return sendError(res, 'Product not found.', 404);
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const details = Object.values(error.errors).map((item) => item.message);
      return sendError(res, 'Validation failed.', 400, details);
    }

    if (error.code === 11000) {
      return sendError(res, 'Duplicate product detected.', 409);
    }

    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, 'Invalid product id.', 400);
    }

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!product) {
      return sendError(res, 'Product not found.', 404);
    }

    res.json(product);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const details = Object.values(error.errors).map((item) => item.message);
      return sendError(res, 'Validation failed.', 400, details);
    }

    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, 'Invalid product id.', 400);
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return sendError(res, 'Product not found.', 404);
    }

    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
