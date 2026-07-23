import { Link } from 'react-router-dom';

function Clothing() {
  return (
    <section className="page-section">
      <h2>Clothing Collection</h2>
      <p>
        Explore our curated collection of apparel, from everyday wear to festive outfits.
        Find the latest clothing styles for men, women, and kids.
      </p>
      <ul>
        <li>Summer Kurtas & Tops</li>
        <li>Silk Sarees & Dress Materials</li>
        <li>Denim Jackets & Casual Outerwear</li>
        <li>Comfortable essentials for daily wear</li>
      </ul>
      <p>
        <Link to="/products">Browse all products</Link> and filter by category to find the perfect clothing item.
      </p>
    </section>
  );
}

export default Clothing;
