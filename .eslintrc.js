module.exports = {
  'env': {
      'browser': true,
      'es6': true,
  },
  'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
      'allowImportExportEverywhere': true,
      'ecmaFeatures': {
          'jsx': true,
      },
      'ecmaVersion': 2018,
      'sourceType': 'module'
  },
  'plugins': [
      'react',
  ],
  'rules': {
      'import/no-unresolved': 'off',
      'semi': 'error',
      'react/jsx-uses-vars': 'error',
      'react/state-in-constructor': [2,'never'],
      'jsx-a11y/no-static-element-interactions': [0],
      'jsx-a11y/no-noninteractive-element-interactions': [0],
      'jsx-a11y/click-events-have-key-events': [0],
      'react/no-access-state-in-setstate': [0],
  },
  'extends': [
      'airbnb',
      'airbnb/hooks',
      'airbnb-base',
      'eslint:recommended', 
      'plugin:react/recommended',

  ]
};
