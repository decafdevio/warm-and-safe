import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Nav";
import MapPage from "./pages/MapPage";
import Map from "./components/Map";
import Admin from "./pages/Admin";
import "./index.css";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div className="overlay">
          <Navbar />
        </div>
        <Routes>
          <Route index element={<MapPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
