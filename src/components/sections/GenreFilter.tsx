import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { movieService } from "../../services/api";
import type { Genre } from "../../types";

interface GenreFilterProps {
  selected: number | null;
  onSelect: (id: number | null) => void;
}

function GenreFilter({ selected, onSelect }: GenreFilterProps) {
  const { data } = useQuery({
    queryKey: ["genres"],
    queryFn: () => movieService.getGenres(),
    staleTime: Infinity,
  });

  const genres: Genre[] = data?.data?.genres || [];

  return (
    <div className="flex gap-2 flex-wrap">
      {/* All */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(null)}
        className={`px-4 py-1.5 rounded-lg text-xs transition-all border ${
          selected === null
            ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400"
            : "bg-transparent border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
        }`}
      >
        All
      </motion.button>

      {genres.map((genre) => (
        <motion.button
          key={genre.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(genre.id === selected ? null : genre.id)}
          className={`px-4 py-1.5 rounded-lg text-xs transition-all border ${
            selected === genre.id
              ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400"
              : "bg-transparent border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
          }`}
        >
          {genre.name}
        </motion.button>
      ))}
    </div>
  );
}

export default GenreFilter;