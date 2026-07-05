import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { movieService } from "../services/api";
import MovieGrid from "../components/sections/MovieGrid";
import GenreFilter from "../components/sections/GenreFilter";
import type { Movie } from "../types";
import HeroSection from "../components/sections/HeroSection";
const tabs = ["Popular", "Top Rated", "Now Playing"];

function Home() {
  const [activeTab, setActiveTab] = useState("Popular");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const fetchFn = {
    Popular: () => movieService.getPopular(),
    "Top Rated": () => movieService.getTopRated(),
    "Now Playing": () => movieService.getNowPlaying(),
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["movies", activeTab],
    queryFn: fetchFn[activeTab as keyof typeof fetchFn],
  });
const movies: Movie[] = (data as any)?.data?.results || [];

  const filtered = useMemo(() => {
    if (!selectedGenre) return movies;
    return movies.filter((m) => m.genre_ids.includes(selectedGenre));
  }, [movies, selectedGenre]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <HeroSection />
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-medium mb-1">
          Discover <span className="text-cyan-400">Movies</span>
        </h1>
        <p className="text-white/30 text-sm">Find your next favorite film</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <motion.button
            key={tab}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm transition-all border ${
              activeTab === tab
                ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400"
                : "bg-transparent border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
            }`}>
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Genre Filter */}
      <div className="mb-8">
        <GenreFilter selected={selectedGenre} onSelect={setSelectedGenre} />
      </div>

      {/* Movies */}
      <MovieGrid
        movies={filtered}
        loading={isLoading}
        error={error ? "Failed to load movies" : null}
      />
    </motion.div>
  );
}

export default Home;
