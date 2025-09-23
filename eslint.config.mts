import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
    ],
    rules: {
      // Add custom TS rules here if needed
    },
  },
  {
    files: ["**/*.{js,ts,tsx,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      js,
      prettier: prettierPlugin,
    },
    extends: [
      "eslint:recommended",
      "plugin:prettier/recommended",
    ],
  },
  prettierConfig,
]);
