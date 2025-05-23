/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      expanded : true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
