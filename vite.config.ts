import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// --- FIX: safely polyfill crypto.getRandomValues ---
try {
  // Some AWS Node environments need this dynamic import
  if (typeof globalThis.crypto?.getRandomValues !== "function") {
    const { webcrypto } = await import("crypto");
    globalThis.crypto = webcrypto as any;
  }
} catch (err) {
  console.warn("⚠️ crypto polyfill failed:", err);
}
// ---------------------------------------------------

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
