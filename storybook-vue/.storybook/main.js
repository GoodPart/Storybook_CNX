/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [{
    "name": "@storybook/addon-essentials",
    "options": {
      "docs": true
    }
  }, "@storybook/addon-onboarding", "@chromatic-com/storybook", "@storybook/experimental-addon-test"],
  "framework": {
    "name": "@storybook/vue3-vite",
    "options": {}
  },
  "features": {
    "storyStoreV7": true
  },
  "docs": {
    "autodocs": true,
    "defaultName": "Documentation"
  }
};
export default config;