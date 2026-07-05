import MovieCard from "../ui/MovieCard";
import Loader from "../ui/Loader";
import type { Movie } from "../../types";

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  error?: string | null;
  title?: string;
}

function MovieGrid({ movies, loading, error, title }: MovieGridProps) {
  if (loading) return <Loader />;

  if (error) return (
    <div className="flex flex-col items-center py-20 gap-3">
      <div className="w-14 h-14 border border-red-500/30 rounded-full flex items-center justify-center">
        <span className="text-red-400 text-xl">!</span>
      </div>
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  );

  if (!movies.length) return (
    <div className="flex flex-col items-center py-20 gap-3">
      <span className="text-5xl">🎬</span>
      <p className="text-white/30 text-sm">No movies found</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      {title && (
        <h2 className="text-white font-medium text-lg">
          {title}
          <span className="text-cyan-400/50 text-sm font-normal ml-2">
            {movies.length} movies
          </span>
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </div>
  );
}

export default MovieGrid;