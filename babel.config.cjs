module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  plugins: [
    // Jest runs in CJS, where `import.meta` is a syntax error. Vite injects
    // `import.meta.env` at build time; in tests we substitute `process.env`.
    function importMetaToProcessEnv({ types: t }) {
      return {
        visitor: {
          MetaProperty(path) {
            path.replaceWith(
              t.objectExpression([
                t.objectProperty(
                  t.identifier("env"),
                  t.memberExpression(
                    t.identifier("process"),
                    t.identifier("env")
                  )
                ),
              ])
            );
          },
        },
      };
    },
  ],
};
