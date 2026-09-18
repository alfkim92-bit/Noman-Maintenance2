import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Legacy static site — kept until the rebuild is signed off, then deleted
    // in one commit. Not part of the app; do not lint it.
    "js/**",
    "css/**",
    "assets/**",
    "fix_encoding.js",
    "update.js",
  ]),
]);

export default eslintConfig;
