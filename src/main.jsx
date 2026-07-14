import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';

const products = [
  {
    id: 1,
    name: 'T-Shirt',
    price: 499,
    category: 'Fashion',
    description: 'Comfortable cotton t-shirt for everyday wear.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Jeans',
    price: 1299,
    category: 'Fashion',
    description: 'Slim-fit denim jeans with a clean finish.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Jacket',
    price: 1999,
    category: 'Fashion',
    description: 'Warm winter jacket with a premium feel.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Desk Lamp',
    price: 899,
    category: 'Home',
    description: 'Modern LED lamp for study and work spaces.',
    image: 'https://via.placeholder.com/150',
  },
];

const categories = ['All', 'Fashion', 'Home'];
const workflowSteps = [
  'Product listing displayed to customers',
  'Search and filter logic narrows results',
  'Add to cart updates the order summary',
  'Checkout completes the purchase flow',
  'Login and registration secure the account',
];

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Welcome back! Browse products and build your cart.');

  // Banner image: place a local file at /public/banner.jpg to override the fallback
  const bannerSrc = '/banner.jpg';
  const bannerFallback = 'https://via.placeholder.com/1200x240?text=ShopHub+Banner';

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'All' || product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
    setMessage(`${product.name} added to the cart.`);
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setMessage('Your cart is empty. Add an item before checkout.');
      return;
    }

    setMessage(`Order placed successfully for ₹${totalPrice.toLocaleString('en-IN')}.`);
    setCart([]);
  };

  const handleAuthSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage('Please enter both email and password.');
      return;
    }

    setUser(email);
    const modeLabel = authMode === 'login' ? 'Logged in' : 'Registered';
    setMessage(`${modeLabel} successfully as ${email}. Your account is ready for checkout.`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fff5f8 0%, #ffe4ea 100%)',
        fontFamily: 'Arial, sans-serif',
        color: '#6b1f2b',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: 'rgba(255,255,255,0.96)',
          borderRadius: '24px',
          boxShadow: '0 18px 45px rgba(0, 0, 0, 0.12)',
          overflow: 'hidden',
        }}
      >
        <header
          style={{
            background: 'linear-gradient(90deg, #ff4d6d 0%, #d62828 100%)',
            color: '#fff',
            padding: '2rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ margin: '0 0 0.4rem', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Real E-Commerce Workflow
              </p>
              <h1 style={{ margin: '0 0 0.5rem', fontSize: '2rem' }}>ShopHub Store</h1>
              <p style={{ margin: 0, lineHeight: 1.6, maxWidth: '640px' }}>
                Browse products, filter results, add items to the cart, complete checkout, and manage your account in one smooth flow.
              </p>
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.16)',
                borderRadius: '16px',
                padding: '1rem 1.2rem',
                minWidth: '220px',
              }}
            >
              <div style={{ fontSize: '0.95rem', marginBottom: '0.3rem' }}>Cart Items</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{totalItems}</div>
              <div style={{ fontSize: '0.95rem', opacity: 0.9 }}>Total: ₹{totalPrice.toLocaleString('en-IN')}</div>
            </div>
          </div>
          {/* Banner image (local /banner.jpg if present, otherwise fallback) */}
          <div style={{ marginTop: '1rem' }}>
            <img
              src={bannerSrc}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = bannerFallback;
              }}
              alt="ShopHub banner"
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>
        </header>

        <main style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', padding: '1.5rem' }}>
          <section>
            <div style={{ marginBottom: '1rem' }}>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid #ffd1dc',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  style={{
                    border: category === item ? 'none' : '1px solid #ffb3c1',
                    background: category === item ? '#d62828' : '#fff5f8',
                    color: category === item ? '#fff' : '#d62828',
                    padding: '0.6rem 0.95rem',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    border: '1px solid #ffd6e0',
                    borderRadius: '16px',
                    padding: '1rem',
                    background: '#fff',
                  }}
                >
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px', marginBottom: '0.7rem' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#ff4d6d', fontWeight: 'bold' }}>{product.category}</span>
                    <span style={{ color: '#8e2d3a', fontWeight: 'bold' }}>₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                  <h3 style={{ margin: '0 0 0.4rem' }}>{product.name}</h3>
                  <p style={{ margin: '0 0 0.8rem', color: '#7a1e1e', lineHeight: 1.5 }}>{product.description}</p>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      width: '100%',
                      border: 'none',
                      background: '#d62828',
                      color: '#fff',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.2rem', background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
              <h3 style={{ marginTop: 0, color: '#d62828' }}>Real Workflow Highlights</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.7rem' }}>
                {workflowSteps.map((step, index) => (
                  <div key={step} style={{ background: '#fff', borderRadius: '12px', padding: '0.8rem', border: '1px solid #ffe0e8' }}>
                    <div style={{ fontWeight: 'bold', color: '#ff4d6d', marginBottom: '0.3rem' }}>Step {index + 1}</div>
                    <div>{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
              <h3 style={{ marginTop: 0, color: '#d62828' }}>Cart Summary</h3>
              {cart.length === 0 ? (
                <p style={{ margin: 0 }}>No items in the cart yet.</p>
              ) : (
                <div style={{ display: 'grid', gap: '0.7rem' }}>
                  {cart.map((item) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '0.7rem', borderRadius: '10px' }}>
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                        <div style={{ color: '#7a1e1e', fontSize: '0.95rem' }}>Qty: {item.quantity}</div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: '#ffe4ea', color: '#d62828', borderRadius: '8px', padding: '0.4rem 0.6rem', cursor: 'pointer' }}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={handleCheckout}
                style={{
                  width: '100%',
                  marginTop: '0.9rem',
                  border: 'none',
                  background: '#d62828',
                  color: '#fff',
                  padding: '0.8rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Checkout
              </button>
            </div>

            <div style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
              <h3 style={{ marginTop: 0, color: '#d62828' }}>Account</h3>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem' }}>
                <button
                  onClick={() => setAuthMode('login')}
                  style={{
                    flex: 1,
                    border: authMode === 'login' ? 'none' : '1px solid #ffb3c1',
                    background: authMode === 'login' ? '#d62828' : '#fff',
                    color: authMode === 'login' ? '#fff' : '#d62828',
                    padding: '0.6rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  style={{
                    flex: 1,
                    border: authMode === 'register' ? 'none' : '1px solid #ffb3c1',
                    background: authMode === 'register' ? '#d62828' : '#fff',
                    color: authMode === 'register' ? '#fff' : '#d62828',
                    padding: '0.6rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                >
                  Register
                </button>
              </div>
              <form onSubmit={handleAuthSubmit} style={{ display: 'grid', gap: '0.7rem' }}>
                <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={{ padding: '0.7rem', borderRadius: '10px', border: '1px solid #ffd1dc' }} />
                <input value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" type="password" style={{ padding: '0.7rem', borderRadius: '10px', border: '1px solid #ffd1dc' }} />
                <button type="submit" style={{ border: 'none', background: '#ff4d6d', color: '#fff', padding: '0.7rem', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                  {authMode === 'login' ? 'Login' : 'Create Account'}
                </button>
              </form>
            </div>

            <div style={{ background: '#fff5f8', borderRadius: '16px', padding: '1rem', border: '1px solid #ffd6e0' }}>
              <h3 style={{ marginTop: 0, color: '#d62828' }}>Status</h3>
              <p style={{ margin: 0, lineHeight: 1.5 }}>{message}</p>
              {user && <p style={{ margin: '0.6rem 0 0', color: '#ff4d6d', fontWeight: 'bold' }}>Signed in as {user}</p>}
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
