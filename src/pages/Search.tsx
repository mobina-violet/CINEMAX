import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { movieService } from "../services/api";
import MovieGrid from "../components/sections/MovieGrid";
import useSearch from "../hooks/useSearch";
import type { Movie } from "../types";

function Search() {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const { query, debouncedQuery, handleSearch } = useSearch();

  useEffect(() => {
    if (urlQuery) handleSearch(urlQuery);
  }, [urlQuery]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => movieService.searchMovies(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  const movies: Movie[] = data?.data?.results || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 md:px-6 py-8"
    >
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-medium mb-6">
          Search <span className="text-cyan-400">Movies</span>
        </h1>

        {/* Search Input */}
        <div className="flex items-center gap-3 bg-[#111] border border-cyan-500/20 rounded-xl px-4 py-3 max-w-2xl">
          <SearchIcon size={18} className="text-cyan-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for movies..."
            className="bg-transparent text-white outline-none w-full text-sm placeholder:text-white/20"
          />
          {query && (
            <button
              onClick={() => handleSearch("")}
              className="text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {!debouncedQuery ? (
        <div className="flex flex-col items-center py-20 gap-4">
          <div className="w-16 h-16 border border-cyan-500/20 rounded-full flex items-center justify-center">
            <SearchIcon size={24} className="text-cyan-400/40" />
          </div>
          <p className="text-white/20 text-sm">Type to search movies...</p>
        </div>
      ) : (
        <MovieGrid
          movies={movies}
          loading={isLoading}
          error={error ? "Search failed" : null}
          title={debouncedQuery ? `Results for "${debouncedQuery}"` : undefined}
        />
      )}
    </motion.div>
  );
}

export default Search;