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
    camelcase: "off",
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    // object-curly-spacing
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "require-jsdoc": "off",
    "new-cap": ["error", { capIsNew: false }],
    "object-curly-spacing": ["error", "always"],
    "missing-trailing-comma": "off",
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
