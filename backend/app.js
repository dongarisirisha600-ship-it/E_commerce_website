import express from 'express';
import productRoutes from './routes/products.js';
import { requestLogger, errorHandler } from './middleware/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.json({ message: 'MegaMart API is running successfully.' });
});

app.use('/api/products', productRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
