import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**', 'out/**'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // The project serves local/uploaded images via plain <img> tags.
      '@next/next/no-img-element': 'off',
    },
  },
];

export default eslintConfig;
