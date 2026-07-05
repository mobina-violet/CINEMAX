function Footer() {
  return (
    <footer className="border-t border-cyan-500/10 mt-20 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-white text-sm font-medium tracking-widest">
          CINE<span className="text-cyan-400">MAX</span>
        </span>
        <p className="text-white/20 text-xs">
          Powered by TMDB API — Built with React + TypeScript
        </p>
        <p className="text-white/20 text-xs">© 2026 CINEMAX</p>
      </div>
    </footer>
  );
}

export default Footer;