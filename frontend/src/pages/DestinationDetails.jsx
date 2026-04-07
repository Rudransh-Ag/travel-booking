import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import destinations from "../assets/destinations";
import { useTravelContext } from "../context/TravelContext";

function StarRating({ rating, interactive, onRate }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="stars-interactive">
      {[1,2,3,4,5].map(s => (
        <span
          key={s}
          style={{ fontSize: interactive ? "28px" : "18px", cursor: interactive ? "pointer" : "default", color: s <= (hover || rating) ? "#f59e0b" : "#d1d5db", transition: "color 0.15s" }}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRate && onRate(s)}
        >★</span>
      ))}
    </div>
  );
}

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useTravelContext();
  const destination = destinations.find(d => d.id === parseInt(id));

  const [activeImg, setActiveImg] = useState(0);
  const [reviews, setReviews] = useState(destination?.reviews || []);
  const [newReview, setNewReview] = useState({ user: "", comment: "", rating: 0 });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const isFavorited = destination && state.favorites.some(d => d.id === destination.id);

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingBreakdown = useMemo(() => {
    const counts = {5:0, 4:0, 3:0, 2:0, 1:0};
    reviews.forEach(r => { counts[r.rating] = (counts[r.rating] || 0) + 1; });
    return counts;
  }, [reviews]);

  if (!destination) return (
    <div className="not-found">
      <h2>Destination not found</h2>
      <button className="btn-primary" onClick={() => navigate("/destinations")}>Back</button>
    </div>
  );

  const handleSubmitReview = () => {
    if (!newReview.user.trim() || !newReview.comment.trim() || newReview.rating === 0) return;
    const review = {
      id: Date.now(),
      user: newReview.user,
      avatar: `https://i.pravatar.cc/50?img=${Math.floor(Math.random() * 70)}`,
      rating: newReview.rating,
      date: new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      comment: newReview.comment,
    };
    setReviews(prev => [review, ...prev]);
    setNewReview({ user: "", comment: "", rating: 0 });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <div className="details-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button onClick={() => navigate("/")}>Home</button>
        <span>›</span>
        <button onClick={() => navigate("/destinations")}>Destinations</button>
        <span>›</span>
        <span>{destination.name}</span>
      </div>

      {/* Gallery */}
      <div className="gallery-section">
        <div className="gallery-main">
          <img src={destination.gallery[activeImg]} alt={destination.name} />
          <button className={`fav-btn fav-btn-lg ${isFavorited ? "fav-active" : ""}`}
            onClick={() => isFavorited
              ? dispatch({ type: "REMOVE_FAVORITE", payload: destination.id })
              : dispatch({ type: "ADD_FAVORITE", payload: destination })
            }>
            {isFavorited ? "♥ Saved" : "♡ Save"}
          </button>
        </div>
        <div className="gallery-thumbs">
          {destination.gallery.map((img, i) => (
            <img key={i} src={img} alt="" className={activeImg === i ? "thumb-active" : ""} onClick={() => setActiveImg(i)} />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="details-content">
        <div className="details-main">
          {/* Header */}
          <div className="details-header">
            <div>
              <div className="details-badges">
                <span className="badge-category">{destination.category}</span>
                <span className="badge-highlight">{destination.badge}</span>
              </div>
              <h1>{destination.name}</h1>
              <p className="details-country">📍 {destination.country}</p>
            </div>
            <div className="details-rating-box">
              <div className="rating-big">{avgRating}</div>
              <StarRating rating={Math.round(avgRating)} />
              <p>{reviews.length} reviews</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {["overview","highlights","reviews"].map(tab => (
              <button key={tab} className={`tab-btn ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="tab-content">
              <p className="details-desc">{destination.description}</p>
              <h3>What's Included</h3>
              <div className="included-grid">
                {destination.included.map(item => (
                  <div key={item} className="included-item"><span>✓</span> {item}</div>
                ))}
              </div>
              <div className="info-pills">
                <div className="info-pill"><span>📅</span><div><small>Duration</small><strong>{destination.duration}</strong></div></div>
                <div className="info-pill"><span>🌤️</span><div><small>Best Season</small><strong>{destination.bestSeason}</strong></div></div>
                <div className="info-pill"><span>👥</span><div><small>Reviews</small><strong>{reviews.length}</strong></div></div>
              </div>
            </div>
          )}

          {activeTab === "highlights" && (
            <div className="tab-content">
              <h3>Top Highlights</h3>
              <div className="highlights-grid">
                {destination.highlights.map((h, i) => (
                  <div key={h} className="highlight-card">
                    <span className="highlight-num">0{i+1}</span>
                    <p>{h}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="tab-content">
              <div className="rating-summary">
                <div className="rating-big-box">
                  <div className="rating-huge">{avgRating}</div>
                  <StarRating rating={Math.round(avgRating)} />
                  <p>{reviews.length} reviews</p>
                </div>
                <div className="rating-bars">
                  {[5,4,3,2,1].map(star => (
                    <div key={star} className="rating-bar-row">
                      <span>{star}★</span>
                      <div className="rating-bar-bg">
                        <div className="rating-bar-fill" style={{ width: `${reviews.length ? (ratingBreakdown[star] / reviews.length) * 100 : 0}%` }} />
                      </div>
                      <span>{ratingBreakdown[star]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reviews-list">
                {reviews.map(r => (
                  <div key={r.id} className="review-card">
                    <img src={r.avatar} alt={r.user} />
                    <div className="review-body">
                      <div className="review-header">
                        <strong>{r.user}</strong>
                        <span className="review-date">{r.date}</span>
                      </div>
                      <StarRating rating={r.rating} />
                      <p>{r.comment}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="add-review">
                <h3>Write a Review</h3>
                {reviewSubmitted && <div className="success-toast">✓ Review submitted! Thank you.</div>}
                <div className="review-form">
                  <input placeholder="Your name" value={newReview.user} onChange={e => setNewReview({ ...newReview, user: e.target.value })} />
                  <div>
                    <p>Your Rating:</p>
                    <StarRating rating={newReview.rating} interactive onRate={r => setNewReview({ ...newReview, rating: r })} />
                  </div>
                  <textarea placeholder="Share your experience..." rows={4} value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })} />
                  <button className="btn-primary" onClick={handleSubmitReview}>Submit Review</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Booking Sidebar */}
        <div className="booking-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-price">
              <span>From</span>
              <h2>₹{destination.price.toLocaleString()}</h2>
              <p>per person</p>
            </div>
            <div className="sidebar-info">
              <div><span>📅</span> {destination.duration}</div>
              <div><span>🌤️</span> Best: {destination.bestSeason}</div>
              <div><span>★</span> {avgRating} / 5.0 rating</div>
            </div>
            <button className="btn-primary full-width" onClick={() => navigate("/booking")}>Book This Package</button>
            <button
              className={`btn-outline full-width ${isFavorited ? "btn-saved" : ""}`}
              onClick={() => isFavorited
                ? dispatch({ type: "REMOVE_FAVORITE", payload: destination.id })
                : dispatch({ type: "ADD_FAVORITE", payload: destination })
              }>
              {isFavorited ? "♥ Saved to Favorites" : "♡ Save to Favorites"}
            </button>
            <p className="sidebar-note">🛡️ Free cancellation up to 7 days before trip</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetails;