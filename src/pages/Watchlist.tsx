import { motion } from "framer-motion";
import { Bookmark, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../context/WatchListContext";
import { getImageUrl } from "../services/api";

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 md:px-6 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-medium mb-1">
          My <span className="text-cyan-400">Watchlist</span>
        </h1>
        <p className="text-white/30 text-sm">
          {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"} saved
        </p>
      </div>

      {watchlist.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center py-24 gap-4">
          <div className="w-20 h-20 border border-cyan-500/20 rounded-full flex items-center justify-center">
            <Bookmark size={28} className="text-cyan-400/30" />
          </div>
          <p className="text-white/30 text-sm">Your watchlist is empty</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 border border-cyan-500/30 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/10 transition-colors mt-2"
          >
            Discover Movies
          </button>
        </div>
      ) : (
        /* Movie List */
        <div className="flex flex-col gap-3">
          {watchlist.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 bg-[#111] border border-white/5 rounded-xl p-3 hover:border-cyan-500/20 transition-colors group cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              {/* Poster */}
              <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10">
                {movie.poster_path ? (
                  <img
                    src={getImageUrl(movie.poster_path, "w185")}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                    <span className="text-lg">🎬</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium line-clamp-1 mb-1">
                  {movie.title}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-white/30 text-xs">
                    {movie.release_date?.split("-")[0]}
                  </span>
                  <span className="text-yellow-400 text-xs">
                    ★ {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWatchlist(movie.id);
                }}
                className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center text-white/30 hover:text-red-400 transition-all shrink-0"
              >
                <Trash2 size={15} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Watchlist;