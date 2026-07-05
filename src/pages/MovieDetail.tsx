import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Clock,
  Bookmark,
  BookmarkCheck,
  Play,
} from "lucide-react";
import { movieService, getImageUrl } from "../services/api";
import { useWatchlist } from "../context/WatchListContext";
import MovieGrid from "../components/sections/MovieGrid";
import Loader from "../components/ui/Loader";
import Badge from "../components/ui/Badge";
import type { MovieDetail as MovieDetailType } from "../types";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => movieService.getMovieDetail(Number(id)),
    enabled: !!id,
  });

  const movie: MovieDetailType = (data as any)?.data;
  const saved = movie ? isInWatchlist(movie.id) : false;

  const trailer = movie?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube",
  );

  const director = movie?.credits?.crew?.find((c) => c.job === "Director");
  const cast = movie?.credits?.cast?.slice(0, 6) || [];
  const similar = movie?.similar?.results?.slice(0, 6) || [];

  if (isLoading) return <Loader />;

  if (error || !movie)
    return (
      <div className="flex flex-col items-center py-20 gap-4">
        <p className="text-red-400">Failed to load movie</p>
        <button onClick={() => navigate(-1)} className="text-cyan-400 text-sm">
          Go back
        </button>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}>
      {/* Backdrop */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {movie.backdrop_path && (
          <img
            src={getImageUrl(movie.backdrop_path, "original")}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-32 relative z-10 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0">
            <div className="w-40 md:w-52 rounded-xl overflow-hidden border border-white/10">
              {movie.poster_path ? (
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className="w-full"
                />
              ) : (
                <div className="aspect-[2/3] bg-[#1a1a1a] flex items-center justify-center">
                  <span className="text-4xl">🎬</span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 flex-1">
            {/* Title */}
            <div>
              <h1 className="text-white text-2xl md:text-3xl font-medium mb-1">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-cyan-400/60 text-sm italic">
                  {movie.tagline}
                </p>
              )}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white text-sm font-medium">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-white/30 text-xs">
                  ({movie.vote_count.toLocaleString()})
                </span>
              </div>
              {movie.runtime > 0 && (
                <div className="flex items-center gap-1 text-white/40 text-xs">
                  <Clock size={12} />
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </div>
              )}
              <span className="text-white/30 text-xs">
                {movie.release_date?.split("-")[0]}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((g) => (
                <Badge key={g.id} label={g.name} color="cyan" />
              ))}
            </div>

            {/* Overview */}
            <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
              {movie.overview}
            </p>

            {/* Director */}
            {director && (
              <p className="text-white/30 text-xs">
                Directed by{" "}
                <span className="text-white/60">{director.name}</span>
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-2">
              tsx
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg text-sm hover:bg-cyan-500/25 transition-colors">
                  <Play size={14} fill="currentColor" />
                  Watch Trailer
                </a>
              )}
              <button
                onClick={() =>
                  saved ? removeFromWatchlist(movie.id) : addToWatchlist(movie)
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors border ${
                  saved
                    ? "bg-cyan-500 border-cyan-500 text-black"
                    : "border-white/10 text-white/40 hover:border-cyan-500/30 hover:text-cyan-400"
                }`}>
                {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                {saved ? "Saved" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div className="mt-12">
            <h2 className="text-white font-medium mb-4">
              Cast{" "}
              <span className="text-cyan-400/50 text-sm font-normal ml-1">
                Top {cast.length}
              </span>
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {cast.map((actor) => (
                <div
                  key={actor.id}
                  className="flex flex-col items-center gap-2 text-center">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 bg-[#1a1a1a]">
                    {actor.profile_path ? (
                      <img
                        src={getImageUrl(actor.profile_path, "w185")}
                        alt={actor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/20 text-lg">👤</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-white text-xs font-medium line-clamp-1">
                      {actor.name}
                    </p>
                    <p className="text-white/30 text-xs line-clamp-1">
                      {actor.character}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Movies */}
        {similar.length > 0 && (
          <div className="mt-12">
            <MovieGrid movies={similar} title="Similar Movies" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default MovieDetail;
