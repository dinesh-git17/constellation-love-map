import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Load Next.js + TypeScript rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 👇 Add rule overrides here
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { vars: "all", args: "none" },
      ],
    },
  },
];

export default eslintConfig;
