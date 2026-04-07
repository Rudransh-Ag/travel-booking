import { Routes, Route } from "react-router-dom";
import { TravelProvider } from "./context/TravelContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import Reports from "./pages/Reports";

function App() {
  return (
    <TravelProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
      <Footer />
    </TravelProvider>
  );
}

export default App;