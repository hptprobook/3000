module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
        charset: "utf-8",
        "end-of-line": "lf",
        indent: ["error", 4, { SwitchCase: 1 }],
        "no-trailing-spaces": ["error", { ignoreComments: true }],
        "eol-last": ["error", "always"],
    },
    overrides: [
        {
            files: ["*.md"],
            rules: {
                "no-trailing-spaces": "off",
            },
        },
        {
            files: ["*.{yml,yaml}"],
            rules: {
                indent: ["error", 2],
            },
        },
        {
            files: ["docker-compose.yml"],
            rules: {
                indent: ["error", 4],
            },
        },
    ],
};
