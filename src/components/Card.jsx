import { Link } from 'react-router-dom';
import './Card.css';

function Card({ id, title, description, price, badge }) {
  return (
    <article className="card">
      <span className="badge">{badge}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-footer">
        <strong>${price}</strong>
        <Link className="card-btn" to={`/products/${id}`}>View Details</Link>
      </div>
    </article>
  );
}

export default Card;
