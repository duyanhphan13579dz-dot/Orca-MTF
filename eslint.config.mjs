import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const reactHooksPlugin = nextCoreWebVitals[0]?.plugins?.["react-hooks"];

const compilerRules = {};
if (reactHooksPlugin?.rules) {
  for (const rule of Object.keys(reactHooksPlugin.rules)) {
    if (rule !== "rules-of-hooks" && rule !== "exhaustive-deps") {
      compilerRules[`react-hooks/${rule}`] = "warn";
    }
  }
}

export default defineConfig([
  // Keep the starter on the flat config export that actually runs under the pinned ESLint/Next toolchain.
  ...nextCoreWebVitals,
  {
    plugins: {
      ...(reactHooksPlugin ? { "react-hooks": reactHooksPlugin } : {}),
    },
    rules: compilerRules,
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
