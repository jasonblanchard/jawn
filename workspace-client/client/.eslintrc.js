module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "plugins": [
        "import",
        "jsx-a11y",
        "react",
    ],
    "env": {
      "browser": true,
      "jest": true,
    },
    "rules": {
      "arrow-body-style": 0,
      "arrow-parens": 0,
      "class-methods-use-this": 0,
      "global-require": 0,
      "import/extensions": 0,
      "import/no-extraneous-dependencies": 0,
      "import/no-unresolved": 0,
      "import/prefer-default-export": 0,
      "jsx-a11y/anchor-is-valid": [ "error", {
        "components": [],
      }],
      "jsx-a11y/label-has-for": [ 2, {
        "required": {
          "every": [ "id" ]
        },
        "allowChildren": false,
      }],
      "jsx-a11y/no-autofocus": 0,
      "max-len": 0,
      "no-case-declarations": 0,
      "no-unused-vars": ["error", { "ignoreRestSiblings": true }],
      "object-curly-newline": 0,
      "react/forbid-prop-types": 0,
      "react/jsx-filename-extension": 0,
      "react/no-multi-comp": 0,
      "react/no-unused-state": 0,
      "react/prefer-stateless-function": 0,
      "react/require-default-props": 0,
      "react/sort-comp": 0,
      "space-before-function-paren": 0,
    }
};
