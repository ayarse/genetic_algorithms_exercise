module.exports = {
    "env": {
        "browser": false,
        "es2021": true
    },
    "extends": [
        "airbnb-base",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "header"
    ],
    "rules": {
        "header/header": [2, "config/header.ts"]
    }
}
