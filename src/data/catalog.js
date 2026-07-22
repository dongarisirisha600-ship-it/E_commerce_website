export const catalogItems = [
  {
    id: 1,
    title: 'Smart Headphones',
    description: 'Immersive audio with noise cancellation.',
    price: 129,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    title: 'Ergo Chair',
    description: 'Comfort-focused seating for long work sessions.',
    price: 189,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    title: 'Wireless Mouse',
    description: 'Responsive control with a long battery life.',
    price: 49,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80'
  }
];

export const stats = [
  { title: 'Happy Customers', value: '10k+' },
  { title: 'Products Listed', value: '250+' },
  { title: 'Shipping Speed', value: '24h' }
];

export const sidebarLinks = ['Home', 'Products', 'About', 'Contact', 'Register'];

export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}
