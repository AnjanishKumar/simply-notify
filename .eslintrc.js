module.exports = {
  env: {
    browser: false,
    node: true,
    es6: true,
    mocha: true
  },
  extends: ['airbnb-base'],

  // add your custom rules here
  rules: {
    'no-underscore-dangle': 'off',
    // 'no-param-reassign': process.env.NODE_ENV === 'production' ? 'off' : 'error',
    'function-paren-newline': 'off',
    'prefer-destructuring': 'off',
    // 'no-console': process.env.NODE_ENV === 'production' ?'error' : 'off',
    'no-debugger': 'error'
  }
};
