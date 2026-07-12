import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dns from "node:dns";

// Resolve local DNS cache propagation issue for Vite proxy
const originalLookup = dns.lookup;
dns.lookup = function (hostname, options, callback) {
  if (hostname === "edumind.api.sophathz.online") {
    if (typeof options === "function") {
      callback = options;
    }
    return callback(null, "52.55.59.209", 4);
  }
  return originalLookup.call(dns, hostname, options, callback);
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://edumind.api.sophathz.online",
        changeOrigin: true,
      },
    },
  },
});
