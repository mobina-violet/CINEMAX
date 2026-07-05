import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../../context/WatchListContext";
import { getImageUrl } from "../../services/api";
import type { Movie } from "../../types";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const saved = isInWatchlist(movie.id);

  //تابع ای که زمانی که کلیک کنیم روی ایکون بوک مارک اجرا میشود
  const handleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    saved ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
  };

  const rating = movie.vote_average.toFixed(1);
  //optional chaining
  const year = movie.release_date?.split("-")[0];

  const getRatingColor = (r: number) => {
    if (r >= 8) return "text-cyan-400";
    if (r >= 6) return "text-green-400";
    return "text-yellow-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="group cursor-pointer bg-[#111] border border-white/5 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-colors">
      {/* Poster */}
      <div className="relative overflow-hidden ">
        {movie.poster_path ? (
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
            <span className="text-white/10 text-4xl">🎬</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0  from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Watchlist button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleWatchlist}
          className={`absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            saved
              ? "bg-cyan-500 text-black"
              : "bg-black/50 text-white/60 opacity-0 group-hover:opacity-100 hover:bg-cyan-500/20 hover:text-cyan-400"
          }`}>
          {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
        </motion.button>

        {/* Rating badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
          <Star size={10} className="text-yellow-400 fill-yellow-400" />
          <span
            className={`text-xs font-medium ${getRatingColor(movie.vote_average)}`}>
            {rating}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-white text-sm font-medium line-clamp-1 mb-1">
          {movie.title}
        </p>
        <p className="text-white/30 text-xs">{year}</p>
      </div>
    </motion.div>
  );
}

export default MovieCard;
