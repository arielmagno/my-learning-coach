// eslint.config.js

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';

export default [
  js.configs.recommended, // base JS rules
  ...tseslint.configs.recommended, // TS rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      import: eslintPluginImport,
      react: eslintPluginReact,
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [['@env', './.env']],
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
      },
    },
    rules: {
      'import/no-unresolved': 'off', // optionally silence this if you want
    },
  },
];
