import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { SocksProxyAgent } from "socks-proxy-agent";

const agent = new SocksProxyAgent("socks5://127.0.0.1:10808");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.themoviedb.org/3",
        changeOrigin: true,
        agent, // 👈 اینجا مستقیم، همین کافیه
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});