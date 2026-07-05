function Loader() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative w-14 h-14">
        <div className="w-14 h-14 border-2 border-cyan-500/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-14 h-14 border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-10 h-10 border-2 border-t-transparent border-r-cyan-400/50 border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
      </div>
    </div>
  );
}

export default Loader;