module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "plugins": [
        "import",
        "jsx-a11y",
        "react",
    ],
    "env": {
      "browser": true
    },
    "rules": {
      "arrow-parens": 0,
      "import/extensions": 0,
      "import/no-extraneous-dependencies": 0,
      "import/no-unresolved": 0,
      "jsx-a11y/anchor-is-valid": [ "error", {
        "components": [],
      }],
      "jsx-a11y/label-has-for": [ 2, {
        "required": {
          "every": [ "id" ]
        },
        "allowChildren": false,
      }],
      "max-len": 0,
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