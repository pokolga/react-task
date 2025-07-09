import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser,
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
    },

    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      eslintPluginPrettier,
    ],

    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs["recommended-latest"].rules,

      "@typescript-eslint/no-explicit-any": "error",
      "no-console": "warn",
      "no-debugger": "error",
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  }
);
