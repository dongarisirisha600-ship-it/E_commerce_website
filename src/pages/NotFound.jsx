import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <section style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist or may have moved.</p>
      <button onClick={() => navigate('/')}>Return to Home</button>
    </section>
  );
}

export default NotFound;
