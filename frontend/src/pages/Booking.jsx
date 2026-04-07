import { useState } from "react";
import destinations from "../assets/destinations";

const steps = ["Trip Details", "Personal Info", "Confirmation"];

function Booking() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ destination: "", travelers: 1, travelDate: "", returnDate: "", name: "", email: "", phone: "", notes: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const selectedDest = destinations.find(d => d.name === form.destination);
  const totalCost = selectedDest ? selectedDest.price * form.travelers : 0;

  if (submitted) return (
    <div className="section" style={{ textAlign: "center", paddingTop: "80px" }}>
      <div className="success-page">
        <div className="success-icon">🎉</div>
        <h2>Booking Confirmed!</h2>
        <p>Thank you, <strong>{form.name}</strong>! Your trip to <strong>{form.destination}</strong> is booked.</p>
        <div className="booking-summary-card">
          <div><span>📍 Destination</span><strong>{form.destination}</strong></div>
          <div><span>👥 Travelers</span><strong>{form.travelers}</strong></div>
          <div><span>📅 Travel Date</span><strong>{form.travelDate}</strong></div>
          <div><span>💰 Total Cost</span><strong>₹{totalCost.toLocaleString()}</strong></div>
        </div>
        <p style={{ color: "var(--text-secondary)" }}>Confirmation sent to <strong>{form.email}</strong></p>
        <button className="btn-primary" onClick={() => { setSubmitted(false); setStep(0); setForm({ destination:"", travelers:1, travelDate:"", returnDate:"", name:"", email:"", phone:"", notes:"" }); }}>Book Another Trip</button>
      </div>
    </div>
  );

  return (
    <div className="section">
      <div className="page-hero-sm">
        <h1>Book Your Trip</h1>
        <p>Fill in the details and we'll handle the rest</p>
      </div>

      <div className="stepper">
        {steps.map((s, i) => (
          <div key={s} className={`step ${i <= step ? "active" : ""} ${i < step ? "done" : ""}`}>
            <div className="step-circle">{i < step ? "✓" : i + 1}</div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div className="booking-layout">
        <div className="booking-form-wrap">
          {step === 0 && (
            <div className="form-section">
              <h3>Select Your Trip</h3>
              <div className="form-group">
                <label>Destination</label>
                <select name="destination" value={form.destination} onChange={handleChange}>
                  <option value="">-- Choose a destination --</option>
                  {destinations.map(d => <option key={d.id} value={d.name}>{d.name} — ₹{d.price.toLocaleString()} / person</option>)}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Travel Date</label>
                  <input type="date" name="travelDate" value={form.travelDate} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Return Date</label>
                  <input type="date" name="returnDate" value={form.returnDate} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Number of Travelers</label>
                <input type="number" name="travelers" min={1} max={20} value={form.travelers} onChange={handleChange} />
              </div>
              <button className="btn-primary" onClick={() => setStep(1)} disabled={!form.destination || !form.travelDate}>Continue →</button>
            </div>
          )}

          {step === 1 && (
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" placeholder="+91 XXXXXXXXXX" value={form.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Special Requests (optional)</label>
                <textarea name="notes" rows={3} placeholder="Any dietary needs, accessibility requirements..." value={form.notes} onChange={handleChange} />
              </div>
              <div className="form-actions">
                <button className="btn-outline" onClick={() => setStep(0)}>← Back</button>
                <button className="btn-primary" onClick={() => setStep(2)} disabled={!form.name || !form.email}>Review Booking →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h3>Confirm Your Booking</h3>
              <div className="confirm-grid">
                <div><label>Destination</label><p>{form.destination}</p></div>
                <div><label>Travel Date</label><p>{form.travelDate}</p></div>
                <div><label>Return Date</label><p>{form.returnDate || "—"}</p></div>
                <div><label>Travelers</label><p>{form.travelers}</p></div>
                <div><label>Name</label><p>{form.name}</p></div>
                <div><label>Email</label><p>{form.email}</p></div>
              </div>
              <div className="form-actions">
                <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-primary" onClick={() => setSubmitted(true)}>Confirm & Book ✓</button>
              </div>
            </div>
          )}
        </div>

        {selectedDest && (
          <div className="price-summary">
            <h3>Price Summary</h3>
            <img src={selectedDest.image} alt={selectedDest.name} style={{ width: "100%", borderRadius: "10px", marginBottom: "15px" }} />
            <h4>{selectedDest.name}</h4>
            <p style={{ color: "var(--text-secondary)", marginBottom: "15px" }}>{selectedDest.duration}</p>
            <div className="price-breakdown">
              <div><span>₹{selectedDest.price.toLocaleString()} × {form.travelers} traveler{form.travelers > 1 ? "s" : ""}</span><span>₹{totalCost.toLocaleString()}</span></div>
              <div className="price-total"><span>Total</span><strong>₹{totalCost.toLocaleString()}</strong></div>
            </div>
            <p className="sidebar-note">🛡️ Free cancellation within 7 days</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;