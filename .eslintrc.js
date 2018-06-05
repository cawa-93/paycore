module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/html-indent': [
      'error',
      'tabs'
    ],
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/html-quotes': [
      'error',
      'single'
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}