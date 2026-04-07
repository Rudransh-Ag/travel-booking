import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFavorite, clearFavorites } from "../store/favoritesSlice";
import { useTheme } from "../context/ThemeContext";
import destinations from "../assets/destinations";

const CATEGORY_COLORS = {
  Beach: "#0ea5e9",
  Adventure: "#f97316",
  Cultural: "#8b5cf6",
  Nature: "#22c55e",
  Hill: "#ec4899",
};

function StatCard({ icon, label, value, sub, gradient }) {
  return (
    <div className="report-stat-card" style={{ background: gradient }}>
      <div className="report-stat-icon">{icon}</div>
      <div className="report-stat-body">
        <p className="report-stat-label">{label}</p>
        <h3 className="report-stat-value">{value}</h3>
        {sub && <p className="report-stat-sub">{sub}</p>}
      </div>
    </div>
  );
}

function Reports() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const { theme, userProfile } = useTheme();

  const [activeTab, setActiveTab] = useState("overview");
  const [sortField, setSortField] = useState("price");

  const allStats = useMemo(() => {
    const total = destinations.length;
    const avgPrice = destinations.reduce((s, d) => s + d.price, 0) / total;
    const avgRating = destinations.reduce((s, d) => s + d.rating, 0) / total;
    const totalReviews = destinations.reduce((s, d) => s + (d.reviewCount || 0), 0);
    const byCategory = destinations.reduce((acc, d) => {
      acc[d.category] = (acc[d.category] || 0) + 1;
      return acc;
    }, {});
    const maxPrice = Math.max(...destinations.map((d) => d.price));
    const minPrice = Math.min(...destinations.map((d) => d.price));
    return { total, avgPrice, avgRating, totalReviews, byCategory, maxPrice, minPrice };
  }, []);

  const favStats = useMemo(() => {
    if (!favorites.length)
      return { total: 0, totalCost: 0, avgRating: 0, savings: 0, categories: {} };
    const totalCost = favorites.reduce((s, d) => s + d.price, 0);
    const avgRating = (favorites.reduce((s, d) => s + d.rating, 0) / favorites.length).toFixed(1);
    const savings = Math.round(totalCost * 0.15);
    const categories = favorites.reduce((acc, d) => {
      acc[d.category] = (acc[d.category] || 0) + 1;
      return acc;
    }, {});
    return { total: favorites.length, totalCost, avgRating, savings, categories };
  }, [favorites]);

  const sortedDestinations = useMemo(() => {
    return [...destinations].sort((a, b) => {
      if (sortField === "price") return b.price - a.price;
      if (sortField === "rating") return b.rating - a.rating;
      if (sortField === "reviews") return b.reviewCount - a.reviewCount;
      return a.name.localeCompare(b.name);
    });
  }, [sortField]);

  const categoryBars = useMemo(() => {
    return Object.entries(allStats.byCategory).map(([cat, count]) => ({
      cat,
      count,
      pct: Math.round((count / allStats.total) * 100),
      color: CATEGORY_COLORS[cat] || "#94a3b8",
    }));
  }, [allStats]);

  return (
    <div>
      <div className="page-hero">
        <h1>📊 Travel Reports</h1>
        <p>Welcome back, {userProfile.name}! Here's your personalized travel analytics dashboard.</p>
        <div className="report-theme-badge">
          {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"} Active
        </div>
      </div>

      <div className="reports-tabs section">
        {["overview", "destinations", "wishlist"].map((tab) => (
          <button
            key={tab}
            className={`report-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "overview" && "📈 Overview"}
            {tab === "destinations" && "🗺️ Destinations"}
            {tab === "wishlist" && `♥ Wishlist (${favorites.length})`}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === "overview" && (
        <div className="section">
          <div className="report-stats-grid">
            <StatCard icon="🗺️" label="Total Destinations" value={allStats.total} sub="Across India" gradient="linear-gradient(135deg, #1e3c72, #2a5298)" />
            <StatCard icon="💰" label="Avg Package Price" value={`₹${Math.round(allStats.avgPrice).toLocaleString()}`} sub="Per person" gradient="linear-gradient(135deg, #ff7e5f, #feb47b)" />
            <StatCard icon="⭐" label="Platform Avg Rating" value={`${allStats.avgRating.toFixed(1)} / 5`} sub="Verified reviews" gradient="linear-gradient(135deg, #f59e0b, #d97706)" />
            <StatCard icon="💬" label="Total Reviews" value={allStats.totalReviews.toLocaleString()} sub="Across all destinations" gradient="linear-gradient(135deg, #11998e, #38ef7d)" />
            <StatCard icon="📉" label="Lowest Package" value={`₹${allStats.minPrice.toLocaleString()}`} sub="Best budget deal" gradient="linear-gradient(135deg, #6366f1, #8b5cf6)" />
            <StatCard icon="📈" label="Premium Package" value={`₹${allStats.maxPrice.toLocaleString()}`} sub="Luxury tier" gradient="linear-gradient(135deg, #ec4899, #f43f5e)" />
          </div>

          <div className="report-section-card">
            <h3>📂 Destinations by Category</h3>
            <div className="category-bars">
              {categoryBars.map(({ cat, count, pct, color }) => (
                <div key={cat} className="cat-bar-row">
                  <span className="cat-bar-label" style={{ color }}>{cat}</span>
                  <div className="cat-bar-track">
                    <div className="cat-bar-fill" style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <span className="cat-bar-count">{count} ({pct}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DESTINATIONS TAB ── */}
      {activeTab === "destinations" && (
        <div className="section">
          <div className="report-section-card">
            <div className="report-table-header">
              <h3>🗺️ All Destinations</h3>
              <div className="sort-controls">
                <label>Sort by: </label>
                <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="sort-select">
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="reviews">Reviews</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
            <div className="report-table-wrap">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Destination</th>
                    <th>Category</th>
                    <th>Price/Person</th>
                    <th>Rating</th>
                    <th>Reviews</th>
                    <th>Duration</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDestinations.map((d, i) => {
                    const isFav = favorites.some((f) => f.id === d.id);
                    return (
                      <tr key={d.id} className={isFav ? "row-fav" : ""}>
                        <td>{i + 1}</td>
                        <td>
                          <div className="table-dest">
                            <img src={d.image} alt={d.name} className="table-thumb" />
                            <span>{d.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="cat-chip"
                            style={{
                              background: CATEGORY_COLORS[d.category] + "22",
                              color: CATEGORY_COLORS[d.category],
                              border: `1px solid ${CATEGORY_COLORS[d.category]}`,
                            }}>
                            {d.category}
                          </span>
                        </td>
                        <td>₹{d.price.toLocaleString()}</td>
                        <td><span className="rating-pill">★ {d.rating}</span></td>
                        <td>{d.reviewCount?.toLocaleString()}</td>
                        <td>{d.duration}</td>
                        <td>
                          <button className="btn-sm btn-primary" onClick={() => navigate(`/destination/${d.id}`)}>
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── WISHLIST TAB ── */}
      {activeTab === "wishlist" && (
        <div className="section">
          {favorites.length === 0 ? (
            <div className="empty-favorites">
              <div className="empty-icon">❤️</div>
              <h2>Your wishlist is empty</h2>
              <p>Save destinations to see your personalized insights here.</p>
              <button className="btn-primary" onClick={() => navigate("/destinations")}>
                Explore Destinations
              </button>
            </div>
          ) : (
            <>
              <div className="report-stats-grid">
                <StatCard icon="♥" label="Saved Destinations" value={favStats.total} sub="In your wishlist" gradient="linear-gradient(135deg, #f43f5e, #ec4899)" />
                <StatCard icon="💰" label="Total Wishlist Value" value={`₹${favStats.totalCost.toLocaleString()}`} sub="Per person total" gradient="linear-gradient(135deg, #ff7e5f, #feb47b)" />
                <StatCard icon="🏷️" label="Potential Savings" value={`₹${favStats.savings.toLocaleString()}`} sub="With 15% promo" gradient="linear-gradient(135deg, #11998e, #38ef7d)" />
                <StatCard icon="⭐" label="Avg Rating" value={`${favStats.avgRating} / 5`} sub="Your picks quality" gradient="linear-gradient(135deg, #f59e0b, #d97706)" />
              </div>

              {Object.keys(favStats.categories).length > 0 && (
                <div className="report-section-card">
                  <h3>🗂️ Wishlist by Category</h3>
                  <div className="category-bars">
                    {Object.entries(favStats.categories).map(([cat, count]) => (
                      <div key={cat} className="cat-bar-row">
                        <span className="cat-bar-label" style={{ color: CATEGORY_COLORS[cat] || "#94a3b8" }}>
                          {cat}
                        </span>
                        <div className="cat-bar-track">
                          <div className="cat-bar-fill"
                            style={{
                              width: `${(count / favStats.total) * 100}%`,
                              background: CATEGORY_COLORS[cat] || "#94a3b8",
                            }}
                          />
                        </div>
                        <span className="cat-bar-count">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="report-section-card">
                <div className="report-table-header">
                  <h3>📋 Wishlist Items</h3>
                  <button className="btn-outline btn-danger btn-sm" onClick={() => dispatch(clearFavorites())}>
                    Clear All
                  </button>
                </div>
                <div className="fav-list">
                  {favorites.map((place) => (
                    <div key={place.id} className="fav-item">
                      <img src={place.image} alt={place.name}
                        onClick={() => navigate(`/destination/${place.id}`)}
                        style={{ cursor: "pointer" }} />
                      <div className="fav-item-info">
                        <div>
                          <span className="fav-category">{place.category}</span>
                          <h3 onClick={() => navigate(`/destination/${place.id}`)} style={{ cursor: "pointer" }}>
                            {place.name}
                          </h3>
                          <p>{place.description}</p>
                          <div className="fav-meta">
                            <span>★ {place.rating}</span>
                            <span>📅 {place.duration}</span>
                            <span>🌤️ {place.bestSeason}</span>
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
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Reports;