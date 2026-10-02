import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Static, local assets are served directly; no image optimization service is needed.
  { rules: { '@next/next/no-img-element': 'off' } },
  globalIgnores(['.next/**', '.vinext/**', '.wrangler/**', 'dist/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
