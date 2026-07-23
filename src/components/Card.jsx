import { Link } from 'react-router-dom';
import './Card.css';

function Card({ id, title, description, price, badge, image, onDelete, isDeleting }) {
  return (
    <article className="card">
      <img
        className="card-image"
        src={image || 'https://placehold.co/600x400/2563eb/ffffff?text=MegaMart'}
        alt={title}
      />
      <span className="badge">{badge}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-footer">
        <strong>₹{price.toFixed ? price.toFixed(2) : price}</strong>
        <div className="card-actions">
          <Link className="card-btn" to={`/products/${id}`}>View</Link>
          <Link className="card-btn secondary" to={`/products/edit/${id}`}>Edit</Link>
          <button className="card-btn danger" onClick={onDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default Card;
