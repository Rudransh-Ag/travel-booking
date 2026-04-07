import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import destinations from "../assets/destinations";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";

const CATEGORIES = ["All", "Beach", "Adventure", "Cultural", "Nature"];

function Destinations() {
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  const [localSearch, setLocalSearch] = useState("");
  const [localCategory, setLocalCategory] = useState("All");
  const [localSort, setLocalSort] = useState("popular");
  const [maxPrice, setMaxPrice] = useState(50000);

  const isFavorited = (id) => favorites.some((d) => d.id === id);

  const filtered = useMemo(() => {
    let list = [...destinations];
    if (localSearch.trim()) {
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(localSearch.toLowerCase()) ||
          d.category.toLowerCase().includes(localSearch.toLowerCase()) ||
          d.description.toLowerCase().includes(localSearch.toLowerCase())
      );
    }
    if (localCategory !== "All") list = list.filter((d) => d.category === localCategory);
    list = list.filter((d) => d.price <= maxPrice);
    switch (localSort) {
      case "price-low": return list.sort((a, b) => a.price - b.price);
      case "price-high": return list.sort((a, b) => b.price - a.price);
      case "rating": return list.sort((a, b) => b.rating - a.rating);
      default: return list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [localSearch, localCategory, localSort, maxPrice]);

  return (
    <div className="destinations-page">
      <div className="page-hero">
        <h1>Explore Destinations</h1>
        <p>Discover {destinations.length} handpicked destinations across India</p>
      </div>

      <div className="filters-bar section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search destinations, categories..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          {localSearch && (
            <button className="clear-search" onClick={() => setLocalSearch("")}>✕</button>
          )}
        </div>
        <div className="filter-controls">
          <div className="category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`cat-tab ${localCategory === cat ? "active" : ""}`}
                onClick={() => setLocalCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            className="sort-select"
            value={localSort}
            onChange={(e) => setLocalSort(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <div className="price-filter">
            <label>Max Budget: ₹{maxPrice.toLocaleString()}</label>
            <input
              type="range" min={5000} max={50000} step={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="results-info">
        <span>Showing <strong>{filtered.length}</strong> of {destinations.length} destinations</span>
        {(localSearch || localCategory !== "All") && (
          <button className="reset-btn" onClick={() => { setLocalSearch(""); setLocalCategory("All"); setMaxPrice(50000); }}>
            Reset Filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="no-results">
          <p style={{ fontSize: "48px" }}>🔍</p>
          <h3>No destinations found</h3>
          <p>Try adjusting your search or filters</p>
          <button className="btn-primary" onClick={() => { setLocalSearch(""); setLocalCategory("All"); setMaxPrice(50000); }}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid section">
          {filtered.map((place) => (
            <div key={place.id} className="card" style={{ cursor: "pointer" }}>
              <img src={place.image} alt={place.name} onClick={() => navigate(`/destination/${place.id}`)} />
              <div className="card-badge">{place.badge}</div>
              <button
                className={`fav-btn ${isFavorited(place.id) ? "fav-active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  isFavorited(place.id)
                    ? dispatch(removeFavorite(place.id))
                    : dispatch(addFavorite(place));
                }}
              >
                {isFavorited(place.id) ? "♥" : "♡"}
              </button>
              <div className="card-overlay" onClick={() => navigate(`/destination/${place.id}`)}>
                <div className="card-meta">
                  <span className="card-category">{place.category}</span>
                  <span className="card-rating">★ {place.rating} ({place.reviewCount.toLocaleString()})</span>
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
      )}
    </div>
  );
}

export default Destinations;