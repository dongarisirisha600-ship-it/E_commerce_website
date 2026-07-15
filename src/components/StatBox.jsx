import './StatBox.css';

function StatBox({ title, value }) {
  return (
    <div className="stat-box">
      <h4>{value}</h4>
      <p>{title}</p>
    </div>
  );
}

export default StatBox;
