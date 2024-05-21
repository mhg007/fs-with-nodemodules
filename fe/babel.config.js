module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  /* Added support for latest Javascript ES2020 by Muhammad Afzal Tahir */
  plugins: [
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
  ],
}
