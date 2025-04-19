import type { Config } from "tailwindcss";

const config: Config = {
  components: "src/components",
  utils: "src/lib/utils",
  resolvedPaths: {
    components: "src/components",
    utils: "src/lib/utils",
  },
  out: "src/components",
  css: "src/index.css",
  tailwind: "tailwind.config.js",
  tsconfig: "tsconfig.json",
};

export default config;
