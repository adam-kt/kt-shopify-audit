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
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    /**
     * Vendored registry code — pulled verbatim by `shadcn add @aceternity/*`
     * and re-pulled on every update. It ships `any`-typed props and plain
     * <img> tags, which fail this project's rules and broke the build twice
     * before. Relaxing the rules here keeps re-installs from being a chore.
     *
     * The convention that makes this safe: files under src/block/ and
     * src/components/ui/ stay PRISTINE. Never edit them. To adapt one, copy it
     * into src/components/site/ — which is linted normally — and change it
     * there. That way `git diff` against the install commit always shows the
     * true upstream delta, and our own code never escapes the linter.
     */
    files: ["src/block/**/*.{ts,tsx}", "src/components/ui/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
