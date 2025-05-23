import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // Apply this configuration to TypeScript files
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Turn off the rule that disallows explicit 'any'
      "@typescript-eslint/no-explicit-any": "off",
      // You might also consider turning off other 'unsafe' rules if 'any' is prevalent
      // For example, if you're dealing with a lot of untyped external data:
      // "@typescript-eslint/no-unsafe-argument": "off",
      // "@typescript-eslint/no-unsafe-assignment": "off",
      // "@typescript-eslint/no-unsafe-call": "off",
      // "@typescript-eslint/no-unsafe-member-access": "off",
      // "@typescript-eslint/no-unsafe-return": "off",
    },
  },
];

export default eslintConfig;
