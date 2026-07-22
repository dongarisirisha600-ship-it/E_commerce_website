import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, getProductList, updateProduct } from '../controllers/productController.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/search', (req, res) => {
  const { name } = req.query;
  const filtered = name
    ? getProductList().filter((item) => item.title.toLowerCase().includes(name.toLowerCase()))
    : [];
  res.json(filtered);
});
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
