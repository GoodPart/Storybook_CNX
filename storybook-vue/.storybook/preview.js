/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    docs: {
      // MDX 문서 지원 설정
      source: {
        state: 'open',
      },
    },
    options: {
      storySort: {
        order: ['Atom', 'Molecule', 'Organism', 'Template', 'Page'],
      },
    },
  },
};

export default preview;