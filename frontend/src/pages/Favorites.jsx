import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite, clearFavorites } from "../store/favoritesSlice";
import { useTheme } from "../context/ThemeContext";

function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile } = useTheme();

  const totalCost = useMemo(
    () => favorites.reduce((sum, d) => sum + d.price, 0),
    [favorites]
  );
  const cheapest = useMemo(
    () => favorites.length ? favorites.reduce((min, d) => d.price < min.price ? d : min) : null,
    [favorites]
  );
  const mostExpensive = useMemo(
    () => favorites.length ? favorites.reduce((max, d) => d.price > max.price ? d : max) : null,
    [favorites]
  );
  const avgRating = useMemo(
    () => favorites.length
      ? (favorites.reduce((s, d) => s + d.rating, 0) / favorites.length).toFixed(1)
      : 0,
    [favorites]
  );

  if (favorites.length === 0)
    return (
      <div className="section empty-favorites">
        <div className="empty-icon">🗺️</div>
        <h2>No Saved Destinations Yet</h2>
        <p>Hey {userProfile.name}! Start exploring and save the destinations that excite you!</p>
        <Link to="/destinations">
          <button className="btn-primary">Explore Destinations</button>
        </Link>
      </div>
    );

  return (
    <div>
      <div className="page-hero">
        <h1>My Saved Destinations</h1>
        <p>{userProfile.name}'s travel wishlist — {favorites.length} destinations saved</p>
      </div>

      <div className="section">
        <div className="fav-stats">
          {[
            { label: "Destinations Saved", value: favorites.length, color: "#1e3c72, #2a5298", icon: "🗺️" },
            { label: "Total Trip Value", value: `₹${totalCost.toLocaleString()}`, color: "#ff7e5f, #feb47b", icon: "💰" },
            { label: "Best Value Trip", value: cheapest?.name || "—", color: "#11998e, #38ef7d", icon: "🏆" },
            { label: "Average Rating", value: `${avgRating} ★`, color: "#834d9b, #d04ed6", icon: "⭐" },
          ].map((s) => (
            <div key={s.label} className="fav-stat-card"
              style={{ background: `linear-gradient(135deg, ${s.color})` }}>
              <div className="fav-stat-icon">{s.icon}</div>
              <p>{s.label}</p>
              <h3>{s.value}</h3>
            </div>
          ))}
        </div>

        <div className="fav-list">
          {favorites.map((place) => (
            <div key={place.id} className="fav-item">
              <img
                src={place.image} alt={place.name}
                onClick={() => navigate(`/destination/${place.id}`)}
                style={{ cursor: "pointer" }}
              />
              <div className="fav-item-info">
                <div>
                  <span className="fav-category">{place.category}</span>
                  <h3 onClick={() => navigate(`/destination/${place.id}`)} style={{ cursor: "pointer" }}>
                    {place.name}
                  </h3>
                  <p>{place.description}</p>
                  <div className="fav-meta">
                    <span>★ {place.rating} ({place.reviewCount?.toLocaleString()} reviews)</span>
                    <span>📅 {place.duration}</span>
                    <span>🌤️ Best: {place.bestSeason}</span>
                  </div>
                </div>
                <div className="fav-item-actions">
                  <div className="fav-price">
                    <span>From</span>
                    <h3>₹{place.price.toLocaleString()}</h3>
                    <p>per person</p>
                  </div>
                  <button className="btn-primary" onClick={() => navigate("/booking")}>Book Now</button>
                  <button className="btn-outline btn-danger" onClick={() => dispatch(removeFavorite(place.id))}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button className="btn-outline btn-danger" onClick={() => dispatch(clearFavorites())}>
            Clear All Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default Favorites;