const jest = require('eslint-plugin-jest');
const js = require('@eslint/js');

module.exports = [
  {
    ignores: ['!.eleventy.js', 'example']
  },
  {
    files: ["**/*.js"],
    rules: {
      ...js.configs.recommended.rules,
      'no-param-reassign': 'off',
      'no-undef': 'off',
    }
  },
  {
    files: ['test/**'],
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
    },
  }
]
