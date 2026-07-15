import './Card.css';

function Card({ title, description, price, badge }) {
  return (
    <article className="card">
      <span className="badge">{badge}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="card-footer">
        <strong>${price}</strong>
        <button className="card-btn">Buy Now</button>
      </div>
    </article>
  );
}

export default Card;
