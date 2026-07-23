import { useState } from 'react';
import './Contact.css';

const initialForm = {
  name: '',
  email: '',
  subject: '',
  category: 'Support',
  message: ''
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm(initialForm);
    }, 500);
  };

  return (
    <section className="contact-page">
      <div className="contact-hero">
        <h2>Contact MegaMart</h2>
        <p>
          Reach us for product support, order questions, or partnership inquiries. Our customer success team is ready to
          help you find the right products, solve issues quickly, and support your business needs.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Customer Support</h3>
          <p>For product questions, order updates, or technical support, contact our support team.</p>
          <ul>
            <li>Email: support@megamart.com</li>
            <li>Phone: +1 (800) 123-4567</li>
            <li>Hours: Mon - Fri, 9:00 AM - 6:00 PM</li>
          </ul>
        </div>

        <div className="contact-card">
          <h3>Partnerships & Wholesale</h3>
          <p>Interested in a partnership, vendor opportunity, or wholesale program? Let’s talk.</p>
          <ul>
            <li>Email: partners@megamart.com</li>
            <li>Phone: +1 (800) 987-6543</li>
          </ul>
        </div>

        <div className="contact-card" style={{ gridColumn: 'span 2' }}>
          <h3>Send us a message</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Your Name
              <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required />
            </label>

            <label>
              Email Address
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" required />
            </label>

            <label>
              Subject
              <input name="subject" value={form.subject} onChange={handleChange} placeholder="What is this about?" required />
            </label>

            <label>
              Inquiry Type
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="Support">Support</option>
                <option value="Partnership">Partnership</option>
                <option value="Sales">Sales</option>
                <option value="Feedback">Feedback</option>
              </select>
            </label>

            <label>
              Your Message
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us how we can help" required />
            </label>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {submitted && <div className="form-status">Thanks! Your message has been received. We’ll reply within one business day.</div>}
        </div>
      </div>
    </section>
  );
}

export default Contact;
