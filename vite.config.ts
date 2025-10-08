import { defineConfig } from "vite";
import { webcrypto } from "crypto";
// Ensure crypto.getRandomValues() exists for Vite in Node
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as any;
}
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";



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
