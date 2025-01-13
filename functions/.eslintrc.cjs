/* eslint-disable quote-props */
module.exports = {
  env: {
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: { var: 2, let: 2, const: 2 },
        MemberExpression: 1,
      },
    ],
    camelcase: "off",
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    // object-curly-spacing
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "require-jsdoc": "off",
    "new-cap": ["error", { capIsNew: false }],
    "object-curly-spacing": ["error", "always"],
    "missing-trailing-comma": "off",
    "comma-dangle": "off",
    "operator-linebreak": "off",
    "max-len": [
      "warn",
      { code: 100, ignoreStrings: true, ignoreComments: true },
    ],
    "no-unused-vars": [
      "warn",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
    "no-undef": "off",
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
