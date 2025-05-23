import type { Preview } from '@storybook/react'

const preview: Preview = {
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