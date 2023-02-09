module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/**/.eslintrc.js", // Ignore built files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    "max-len": ["warn", {"code": 100}],
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],
    "import/no-unresolved": 0,
    "spaced-comment": ["warn", "always", { "block": { "exceptions": ["*"] } }],
    "require-jsdoc": "off",
    "prefer-const": "error",
    "prefer-object-spread": "error",
    "no-constant-binary-expression": "warn",
    "no-duplicate-imports": "error",
    "no-else-return": "off",
    "@typescript-eslint/no-implicit-any": "off",
    "no-trailing-spaces": "off",
    "no-var": "error",
    "object-curly-spacing": ["warn", "always"],
    "one-var": ["warn", "never"],
    "indent": ["warn", 2, {"MemberExpression": 1}],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/type-annotation-spacing": "warn",
    "arrow-parens": [
      "off",
      "always"
    ],
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "format": [
          "camelCase",
          "UPPER_CASE"
        ]
      },
      {
        "selector": "parameter",
        "format": ["camelCase"]
      },
      {
        "selector": "memberLike",
        "format": ["camelCase"],
        "leadingUnderscore": "allow"
      },
      {
        "selector": "enumMember",
        "format": ["PascalCase"]
      },
      {
        "selector": "classProperty",
        "modifiers": ["readonly"],
        "format": ["camelCase", "UPPER_CASE"],
        "leadingUnderscore": "allow"
      },
      {
        "selector": "objectLiteralProperty",
        "format": ["camelCase", "snake_case"]
      },
      {
        "selector": "typeLike",
        "format": ["PascalCase"]
      },
      {
        "selector": "typeProperty",
        "format": ["camelCase", "snake_case"]
      }
    ],
  },
};
