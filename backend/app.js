import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/products.js';
import { requestLogger, errorHandler } from './middleware/index.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.json({ message: 'MegaMart API is running successfully.' });
});

app.use('/api/products', productRoutes);
app.use(errorHandler);

const initializeApp = async () => {
  await connectDB();
  return app;
};

export { initializeApp };
export default app;
