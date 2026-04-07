import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3><span>✈</span> TravelX</h3>
          <p>Crafting unforgettable journeys across India's most breathtaking destinations since 2020.</p>
          <div className="footer-socials">
            <a href="#">📸</a>
            <a href="#">🐦</a>
            <a href="#">👤</a>
            <a href="#">▶</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/destinations">All Destinations</Link>
          <Link to="/destinations">Beach Getaways</Link>
          <Link to="/destinations">Mountain Adventures</Link>
          <Link to="/destinations">Cultural Tours</Link>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/contact">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/booking">Book a Trip</Link>
          <Link to="/favorites">My Favorites</Link>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <a href="#">FAQs</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cancellation Policy</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 TravelX. All Rights Reserved. | Made with ♥ in India</p>
      </div>
    </footer>
  );
}

export default Footer;