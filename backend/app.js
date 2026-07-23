import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import connectDB from './config/db.js';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import { requestLogger, errorHandler } from './middleware/index.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'http://localhost:5175',
    'http://127.0.0.1:5175'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(requestLogger);

app.get('/', (req, res) => {
  res.json({ message: 'MegaMart API is running successfully.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use(errorHandler);

const initializeApp = async () => {
  await connectDB();
  return app;
};

export { initializeApp };
export default app;
