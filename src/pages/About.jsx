import './About.css';

function About() {
  return (
    <section className="about-page">
      <div className="about-hero">
        <h2>About MegaMart</h2>
        <p>
          MegaMart is a full-stack ecommerce project built with React, Vite, Express, and MongoDB. It demonstrates reusable UI components,
          dynamic product browsing, customer registration, and backend-powered data management.
        </p>
      </div>

      <div className="features-list">
        <div className="feature-card">
          <h3>Functional Components</h3>
          <p>Each page and UI element is implemented using React functional components for cleaner, modern application structure.</p>
        </div>

        <div className="feature-card">
          <h3>Reusable Components</h3>
          <p>Shared UI elements like Navbar, Sidebar, Footer, and Card are reused across pages for consistent design and faster development.</p>
        </div>

        <div className="feature-card">
          <h3>Backend Integration</h3>
          <p>Product data is loaded from an Express API with MongoDB persistence, supporting searching, sorting, paging, and CRUD operations.</p>
        </div>

        <div className="feature-card">
          <h3>Responsive Styling</h3>
          <p>The app uses responsive CSS layouts that work well on desktop and mobile screens, with clean spacing and modern visuals.</p>
        </div>
      </div>
    </section>
  );
}

export default About;
