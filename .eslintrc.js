module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-alert': 'warn',
    'prettier/prettier': 'error',
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    'global-require': 'warn',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'off',
    'react/jsx-props-no-spreading': 'warn',
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    'react/jsx-filename-extension': 'off',
    // Use function hoisting to improve code readability
    'no-use-before-define': 'off',
    // Allow most functions to rely on type inference. If the function is exported, then `@typescript-eslint/explicit-module-boundary-types` will ensure it's typed.
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-void': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      // Define enums in UPPER_CASE
      { selector: 'enum', format: ['UPPER_CASE'] },
    ],
  },
  overrides: [
    {
      files: ['src/shared/redux/**/*'],
      rules: {
        // Allow param reassignment in reducers because immer is used under the hood
        'no-param-reassign': 'off',
        // Allow the cycle due to type definitions
        'import/no-cycle': `off`,
      },
    },
  ],
};
