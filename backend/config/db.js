import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Product from '../models/Product.js';

let mongoServer;

const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      {
        title: 'Smart Headphones',
        description: 'Immersive audio with active noise cancellation.',
        price: 129,
        category: 'Electronics',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
        status: 'In Stock'
      },
      {
        title: 'Ergo Chair',
        description: 'Comfortable ergonomic seating for long work sessions.',
        price: 189,
        category: 'Furniture',
        stock: 8,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
        status: 'Low Stock'
      },
      {
        title: 'Wireless Mouse',
        description: 'Reliable wireless mouse with a long battery life.',
        price: 49,
        category: 'Accessories',
        stock: 20,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
        status: 'In Stock'
      },
      {
        title: 'Cotton Summer Kurta',
        description: 'Lightweight cotton kurta with vibrant prints for everyday wear.',
        price: 699,
        category: 'Clothing',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=900&q=80',
        status: 'In Stock'
      },
      {
        title: 'Silk Saree',
        description: 'Traditional silk saree in rich colors for festivals and special occasions.',
        price: 2499,
        category: 'Clothing',
        stock: 10,
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
        status: 'Low Stock'
      },
      {
        title: 'Denim Jacket',
        description: 'Casual denim jacket with soft lining and a modern fit.',
        price: 1199,
        category: 'Clothing',
        stock: 12,
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
        status: 'In Stock'
      }
    ]);
  }
};

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const mongoUri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('<')
      ? process.env.MONGO_URI
      : undefined;

    let uri = mongoUri;

    if (!uri) {
      mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log('Using an in-memory MongoDB server for local development.');
    }

    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log(`MongoDB connected successfully to ${conn.connection.host}/${conn.connection.name}`);
    await seedProducts();
  } catch (error) {
    console.error('MongoDB connection failed.');
    console.error(error.message);
    console.warn('Please verify your Atlas connection string, username, password, network access, and IP whitelist.');
  }
};

export default connectDB;
