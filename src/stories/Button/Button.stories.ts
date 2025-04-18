import type { Meta, StoryObj } from '@storybook/react';

// import { Button, ButtonCore } from './Button';
import { Button } from '../../../storybook-react/src/stories/Atom/Button/variant/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'ReadMe',
  // component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof Button>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

const  metaPrimary = {
  title : "Button",
  component : Button,
} satisfies Meta<typeof Button>

export default metaPrimary;
type ReactStory = StoryObj<typeof metaPrimary>



export const React:ReactStory = {
  args: {
    primary: true,
    label: 'Button',
  },
};