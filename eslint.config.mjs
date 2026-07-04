// @ts-check
import nextConfig from "eslint-config-next";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  // Spread the flat config array exported by eslint-config-next
  ...nextConfig,
  {
    rules: {
      // Catch unused vars, allow _ prefix
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // Prefer const
      "prefer-const": "error",
      // Warn on console.log (allow warn/error)
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export default eslintConfig;
