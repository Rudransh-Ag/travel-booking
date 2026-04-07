import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <div>
      <div className="page-hero">
        <h1>Get In Touch</h1>
        <p>Have a question? Send us a message and we'll respond within 24 hours.</p>
      </div>

      <div className="section contact-layout">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>Our travel experts are ready to help you plan the perfect trip.</p>
          {[
            { icon: "📍", title: "Our Office", info: "12, Travel Square, Mumbai, Maharashtra — 400001" },
            { icon: "📞", title: "Phone", info: "+91 98765 43210" },
            { icon: "✉️", title: "Email", info: "hello@travelx.com" },
            { icon: "⏰", title: "Working Hours", info: "Mon–Sat: 9 AM – 7 PM IST" },
          ].map(c => (
            <div key={c.title} className="contact-item">
              <div className="contact-icon">{c.icon}</div>
              <div><strong>{c.title}</strong><p>{c.info}</p></div>
            </div>
          ))}
          <div className="contact-map-placeholder"><p>📍 Mumbai, India</p></div>
        </div>

        <div className="contact-form-wrap">
          {sent ? (
            <div className="success-page" style={{ padding: "40px" }}>
              <div className="success-icon">✉️</div>
              <h3>Message Sent!</h3>
              <p>We'll get back to you within 24 hours.</p>
              <button className="btn-primary" onClick={() => setSent(false)}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <h2>Send a Message</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required>
                  <option value="">-- Select a topic --</option>
                  <option>Package Inquiry</option>
                  <option>Booking Support</option>
                  <option>Cancellation / Refund</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows={5} placeholder="Tell us how we can help..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
              </div>
              <button type="submit" className="btn-primary full-width">Send Message →</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;