import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import Home from "./pages/Home";
import Search from "./pages/Search";
import MovieDetail from "./pages/MovieDetail";
import Watchlist from "./pages/Watchlist";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      <main className="pt-16">
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </AnimatePresence>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default App;