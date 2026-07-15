export const catalogItems = [
  {
    id: 1,
    title: 'Smart Headphones',
    description: 'Immersive audio with noise cancellation.',
    price: 129,
    badge: 'Trending'
  },
  {
    id: 2,
    title: 'Ergo Chair',
    description: 'Comfort-focused seating for long work sessions.',
    price: 189,
    badge: 'Bestseller'
  },
  {
    id: 3,
    title: 'Wireless Mouse',
    description: 'Responsive control with a long battery life.',
    price: 49,
    badge: 'New'
  }
];

export const stats = [
  { title: 'Happy Customers', value: '10k+' },
  { title: 'Products Listed', value: '250+' },
  { title: 'Shipping Speed', value: '24h' }
];

export const sidebarLinks = ['Home', 'Products', 'About', 'Contact'];

export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}
