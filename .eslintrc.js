module.exports = {
    "env": {
      "browser": true,
      "node": true,
      "es6": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "airbnb-base"
    ],
    "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "plugins": [
      "react"
    ],
    "rules": {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "never"],
      "object-curly-spacing": ["error", "always"],
    },
    "parser": "babel-eslint",
    "settings": {
      "import/resolver": {
        "node": {
          "extensions": [".js", ".jsx", ".ts", ".tsx"]
        }
      }
    }
  };