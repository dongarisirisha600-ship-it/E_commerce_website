export const catalogItems = [
  {
    id: 1,
    title: 'Smart Headphones',
    description: 'Immersive audio with noise cancellation for work and travel.',
    price: 129,
    badge: 'Trending',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    title: 'Ergo Chair',
    description: 'Comfort-focused seating designed for long work sessions.',
    price: 189,
    badge: 'Bestseller',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    title: 'Wireless Mouse',
    description: 'Responsive control with long battery life and smooth tracking.',
    price: 49,
    badge: 'New',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    title: 'Premium Backpack',
    description: 'Durable everyday carry backpack with smart compartments.',
    price: 89,
    badge: 'Trending',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    title: 'Cotton Summer Kurta',
    description: 'Lightweight cotton kurta in seasonal colors for men and women.',
    price: 699,
    badge: 'Bestseller',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    title: 'Silk Saree Set',
    description: 'Elegant silk saree with traditional patterns, perfect for celebrations.',
    price: 2499,
    badge: 'Trending',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    title: 'Denim Jacket',
    description: 'Stylish denim jacket with durable stitching and comfort lining.',
    price: 1199,
    badge: 'New',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    title: 'Desk Lamp Pro',
    description: 'Bright, energy-saving lighting for study and workspaces.',
    price: 59,
    badge: 'New',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    title: 'Fitness Watch',
    description: 'Track your steps, sleep, and daily activity in style.',
    price: 149,
    badge: 'Bestseller',
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    title: 'Home Speaker Mini',
    description: 'Compact sound system with deep bass and clean audio.',
    price: 79,
    badge: 'Trending',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    title: 'Coffee Maker',
    description: 'A simple brew machine for modern kitchens and daily comfort.',
    price: 99,
    badge: 'New',
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'
  }
];

export const stats = [
  { title: 'Happy Customers', value: '10k+' },
  { title: 'Products Listed', value: '250+' },
  { title: 'Shipping Speed', value: '24h' },
  { title: 'Review Score', value: '4.8/5' }
];

export const sidebarLinks = ['Home', 'Products', 'About', 'Contact', 'Register'];

export function formatCurrency(amount) {
  return `₹${amount.toFixed(2)}`;
}
