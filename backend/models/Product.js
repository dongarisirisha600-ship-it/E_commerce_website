import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    stock: {
      type: Number,
      default: 0,
      min: 0
    },
    status: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock'],
      default: 'In Stock'
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
