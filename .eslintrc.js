module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: [
    'airbnb-base',
  ],
  ignorePatterns: ['!.eleventy.js'],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'no-param-reassign': 'off',
    'no-undef': 'off',
  },
};
