/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */

module.exports = {
    env: {
        browser: false,
        es2021: true,
    },
    extends: [
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        "header",
    ],
    rules: {
        "header/header": [2, "config/header.ts"]

    },
};
