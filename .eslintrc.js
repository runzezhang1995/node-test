module.exports = {
    parser: "babel-eslint",
    extends: [
        "airbnb"
    ],
    rules: {
        "jsx-quotes": ["error", "prefer-single"],
        "indent": ["error", 4],
        "react/jsx-indent-props": "off",
        "react/jsx-indent": "off",
        "react/prefer-stateless-function": "off",
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to", "hrefLeft", "hrefRight" ],
            "aspects": [ "noHref", "invalidHref", "preferButton" ]
        }],
        "jsx-a11y/label-has-for": [ "error", {
            "required": {
                "some": [ "nesting", "id" ]
            },
        }]
    },
    plugins: [
        "babel"
    ]
};