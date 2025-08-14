import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import globals from "globals";
//import prettier from 'eslint-config-prettier'
import pluginPrettier from "eslint-plugin-prettier";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: ["dist", "node_modules"],
  },

  // TypeScript + React + Prettier + Next.js rules via FlatCompat
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": "warn",
      "no-debugger": "error",
    },
  },

  // Legacy configs adapted via FlatCompat
  ...compat.extends("plugin:@typescript-eslint/strict"),
  ...compat.extends("plugin:react/recommended"),
  ...compat.extends("plugin:react/jsx-runtime"),
  ...compat.extends("plugin:react-hooks/recommended"),
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("prettier"),
];
