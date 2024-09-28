const airbnbBase = require('eslint-config-airbnb-base');
const jest = require('eslint-plugin-jest');

module.exports = [
  {
    ignores: ['!.eleventy.js', 'example']
  },
  {
    rules: {
      ...airbnbBase.rules,
      'no-param-reassign': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['test/**'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
    },
  }
]
