import eslint from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['ativ03/**']
  },

  eslint.configs.recommended,

  {
    languageOptions: {
      globals: globals.node
    },

    rules: {
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_'
        }
      ]
    }
  }
];