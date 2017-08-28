module.exports = {
    "extends": [
      "eslint:recommended",
    ],
    "env": {
      "browser": true,
      "es6": true,
      "node": true,
    },
    "parserOptions": {
      "sourceType": "module",
      "ecmaFeatures": {
          "modules": true
      }
    },
    "rules": {
        "no-console":0,
    },
    "plugins": [
        "import"
    ]
};
