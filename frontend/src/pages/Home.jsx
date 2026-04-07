import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import destinations from "../assets/destinations";

const stats = [
  { value: "50K+", label: "Happy Travelers" },
  { value: "120+", label: "Destinations" },
  { value: "4.9★", label: "Average Rating" },
  { value: "10+", label: "Years Experience" },
];

const testimonials = [
  { name: "Rohit Sharma", role: "Adventure Traveler", avatar: "https://i.pravatar.cc/60?img=14", text: "TravelX turned my dream Ladakh trip into reality. Flawless planning, unforgettable memories!", rating: 5 },
  { name: "Neha Kapoor", role: "Honeymoon Traveler", avatar: "https://i.pravatar.cc/60?img=2", text: "Goa with TravelX was pure magic. Every detail was taken care of — we just relaxed and enjoyed.", rating: 5 },
  { name: "Amit Desai", role: "Family Traveler", avatar: "https://i.pravatar.cc/60?img=17", text: "Kerala backwaters with family was our best vacation ever. TravelX made it stress-free!", rating: 5 },
];

function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ color: s <= rating ? "#f59e0b" : "#d1d5db" }}>★</span>
      ))}
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const topPicks = useMemo(() =>
    [...destinations].sort((a, b) => b.rating - a.rating).slice(0, 3), []
  );

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🏆 India's #1 Travel Platform</div>
          <h1>Discover Your Next<br /><span className="hero-highlight">Adventure</span></h1>
          <p>Explore breathtaking destinations handpicked by travel experts. Unforgettable experiences, unbeatable prices.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/destinations")}>Explore Destinations →</button>
            <button className="btn-outline" onClick={() => navigate("/booking")}>Plan My Trip</button>
          </div>
          <div className="hero-trust">
            <div className="trust-avatars">
              {[11,5,15,22,9].map(i => (
                <img key={i} src={`https://i.pravatar.cc/32?img=${i}`} alt="traveler" />
              ))}
            </div>
            <span>Join 50,000+ happy travelers</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        {stats.map(s => (
          <div key={s.label} className="stat-card">
            <h2>{s.value}</h2>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* TOP PICKS */}
      <section className="section">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">Handpicked For You</p>
            <h2 className="section-title">Top Rated Destinations</h2>
          </div>
          <button className="btn-outline" onClick={() => navigate("/destinations")}>View All →</button>
        </div>
        <div className="grid">
          {topPicks.map(place => (
            <div key={place.id} className="card" onClick={() => navigate(`/destination/${place.id}`)} style={{ cursor: "pointer" }}>
              <img src={place.image} alt={place.name} />
              <div className="card-badge">{place.badge}</div>
              <div className="card-overlay">
                <div className="card-meta">
                  <span className="card-category">{place.category}</span>
                  <span className="card-rating">★ {place.rating}</span>
                </div>
                <h3>{place.name}</h3>
                <p>{place.description}</p>
                <div className="card-footer">
                  <div>
                    <span className="card-from">From</span>
                    <strong className="card-price">₹{place.price.toLocaleString()}</strong>
                  </div>
                  <span className="card-duration">{place.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="why-section section">
        <div className="section-header centered">
          <p className="section-eyebrow">Why TravelX</p>
          <h2 className="section-title">Travel Smarter, Not Harder</h2>
        </div>
        <div className="why-grid">
          {[
            { icon: "🛡️", title: "100% Safe & Verified", desc: "All our packages are verified, licensed and insured for your complete peace of mind." },
            { icon: "💰", title: "Best Price Guarantee", desc: "We match any lower price you find — your dream trip at the best possible rate." },
            { icon: "🎯", title: "Tailored Experiences", desc: "Every itinerary is customized to your preferences, pace and budget." },
            { icon: "📞", title: "24/7 Expert Support", desc: "Our travel experts are available around the clock, wherever you are." },
          ].map(w => (
            <div key={w.title} className="why-card">
              <div className="why-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section section">
        <div className="section-header centered">
          <p className="section-eyebrow">Real Stories</p>
          <h2 className="section-title">What Our Travelers Say</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.name} className="testimonial-card">
              <StarRating rating={t.rating} />
              <p>"{t.text}"</p>
              <div className="testimonial-user">
                <img src={t.avatar} alt={t.name} />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready for Your Next Adventure?</h2>
          <p>Limited time offer — Get 15% off on all packages booked this month</p>
          <button className="btn-primary" onClick={() => navigate("/booking")}>Book Now & Save 15%</button>
        </div>
      </section>
    </>
  );
}

export default Home;