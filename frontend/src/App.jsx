import { Routes, Route, useLocation } from "react-router-dom";
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
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const location = useLocation();
  const authPages = ["/login", "/dashboard"];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <TravelProvider>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </TravelProvider>
  );
}

export default App;