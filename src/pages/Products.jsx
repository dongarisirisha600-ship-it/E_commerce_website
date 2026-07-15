import Card from '../components/Card';
import { catalogItems } from '../data/catalog';
import './Products.css';

function Products() {
  return (
    <section className="products-page">
      <h2>Products Page</h2>
      <p>Reusable cards make it easy to display multiple products with shared props.</p>
      <div className="cards-grid">
        {catalogItems.map((item) => (
          <Card key={item.id} title={item.title} description={item.description} price={item.price} badge={item.badge} />
        ))}
      </div>
    </section>
  );
}

export default Products;
