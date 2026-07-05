import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Play, Bookmark, BookmarkCheck, Star, Clock } from "lucide-react";
import { movieService, getImageUrl } from "../../services/api";
import { useWatchlist } from "../../context/WatchListContext";
import Loader from "../ui/Loader";
import type { Movie } from "../../types";

function HeroSection() {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const { data, isLoading } = useQuery({
    queryKey: ["nowPlaying"],
    queryFn: () => movieService.getNowPlaying(),
    staleTime: 1000 * 60 * 10,
  });
  const movies: Movie[] = (data as any)?.data?.results || [];
  const hero = movies[0];
  const saved = hero ? isInWatchlist(hero.id) : false;

  if (isLoading) return <Loader />;
  if (!hero) return null;

  return (
    <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0">
        <img
          src={getImageUrl(hero.backdrop_path, "original")}
          alt={hero.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/30 to-transparent" />

      {/* Neon glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-xl">
            {/* Label */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-cyan-400 rounded-full" />
              <span className="text-cyan-400 text-xs tracking-widest uppercase">
                Now Playing
              </span>
            </div>

            {/* Title */}
            <h1 className="text-white text-3xl md:text-4xl font-medium mb-3 leading-tight">
              {hero.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star size={13} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white text-sm font-medium">
                  {hero.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-1 text-white/40 text-xs">
                <Clock size={12} />
                {hero.release_date?.split("-")[0]}
              </div>
              <span className="text-white/40 text-xs">
                {hero.vote_count.toLocaleString()} reviews
              </span>
            </div>

            {/* Overview */}
            <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-2">
              {hero.overview}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`/movie/${hero.id}`}
                className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 px-5 py-2.5 rounded-lg text-sm hover:bg-cyan-500/30 transition-colors">
                <Play size={14} fill="currentColor" />
                View Details
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  saved ? removeFromWatchlist(hero.id) : addToWatchlist(hero)
                }
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-colors border ${
                  saved
                    ? "bg-cyan-500 border-cyan-500 text-black font-medium"
                    : "border-white/10 text-white/50 hover:border-cyan-500/30 hover:text-cyan-400"
                }`}>
                {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                {saved ? "Saved" : "Watchlist"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Side thumbnails — فیلم‌های بعدی */}
      <div className="absolute right-6 bottom-12 hidden lg:flex flex-col gap-2">
        {movies.slice(1, 4).map((movie, i) => (
          <motion.a
            key={movie.id}
            href={`/movie/${movie.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            whileHover={{ scale: 1.05, x: -4 }}
            className="flex items-center gap-3 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-2 hover:border-cyan-500/30 transition-colors w-48">
            <div className="w-10 h-14 rounded-md overflow-hidden shrink-0">
              <img
                src={getImageUrl(movie.poster_path, "w185")}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium line-clamp-1">
                {movie.title}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={9} className="text-yellow-400 fill-yellow-400" />
                <span className="text-cyan-400 text-xs">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
