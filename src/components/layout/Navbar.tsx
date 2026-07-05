import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Bookmark, Menu, X } from "lucide-react";
import { useWatchlist } from "../../context/WatchListContext";
import useSearch from "../../hooks/useSearch";

function Navbar() {
  const { watchlist } = useWatchlist();
  const { query, handleSearch } = useSearch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setSearchOpen(false);
    }
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Discover", path: "/discover" },
    { label: "Watchlist", path: "/watchlist" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 border border-cyan-500/40 rounded-lg flex items-center justify-center bg-cyan-500/10">
            <span className="text-cyan-400 text-xs font-medium">C</span>
          </div>
          <span className="text-white font-medium text-sm tracking-widest hidden sm:block">
            CINE<span className="text-cyan-400">MAX</span>
          </span>
        </NavLink>

        {/* Nav Links — desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `text-sm transition-colors relative ${
                  isActive ? "text-cyan-400" : "text-white/40 hover:text-white/70"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-cyan-400"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          {/* Search Desktop */}
          <AnimatePresence>
            {searchOpen ? (
              <motion.form
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSubmit}
                className="hidden md:flex items-center bg-[#111] border border-cyan-500/20 rounded-lg px-3 py-1.5 gap-2 overflow-hidden"
              >
                <Search size={14} className="text-cyan-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search movies..."
                  className="bg-transparent text-sm text-white outline-none w-full placeholder:text-white/20"
                />
                <button type="button" onClick={() => setSearchOpen(false)}>
                  <X size={14} className="text-white/30 hover:text-white/60" />
                </button>
              </motion.form>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-2 bg-[#111] border border-white/10 rounded-lg px-3 py-1.5 text-white/30 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
              >
                <Search size={14} />
                <span className="text-xs">Search...</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Watchlist Icon */}
          <NavLink
            to="/watchlist"
            className="relative w-8 h-8 flex items-center justify-center border border-white/10 rounded-lg hover:border-cyan-500/30 hover:text-cyan-400 text-white/40 transition-colors"
          >
            <Bookmark size={15} />
            {watchlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-black text-xs rounded-full flex items-center justify-center font-medium">
                {watchlist.length}
              </span>
            )}
          </NavLink>

          {/* Notification */}
          <button className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-lg hover:border-cyan-500/30 hover:text-cyan-400 text-white/40 transition-colors">
            <Bell size={15} />
          </button>

          {/* Avatar */}
          <div className="w-8 h-8 bg-cyan-500/15 border border-cyan-500/30 rounded-lg flex items-center justify-center">
            <span className="text-cyan-400 text-xs font-medium">M</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-cyan-500/10 bg-[#080808]"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm py-2 border-b border-white/5 transition-colors ${
                      isActive ? "text-cyan-400" : "text-white/40"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <form onSubmit={handleSubmit} className="flex items-center bg-[#111] border border-cyan-500/20 rounded-lg px-3 py-2 gap-2 mt-2">
                <Search size={14} className="text-cyan-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search movies..."
                  className="bg-transparent text-sm text-white outline-none w-full placeholder:text-white/20"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;