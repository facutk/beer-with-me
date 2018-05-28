module.exports = {
    "extends": "airbnb",
    "rules": {
        "comma-dangle": ["error", "never"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    },
    "globals": {
        "fetch": false
    },
    "env": {
        "browser": true
    }
};