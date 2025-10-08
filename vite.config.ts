import { defineConfig } from "vite";
import { webcrypto } from "crypto";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Polyfill for webcrypto
if (!globalThis.crypto) {
  (globalThis as any).crypto = webcrypto;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    postcss: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
