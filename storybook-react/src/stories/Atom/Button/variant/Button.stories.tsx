import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Iconimg from "../../../../assets/react.svg"

// import Button from './Button';
import Button from "../../../../../../shared/components/component/react/atom/Button/Button";

const meta = {
  title: 'Atom/Button/variant',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant : "default",
    children: "React",
    size : "s",
    disabled : true
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "React",
    size: "s"
  }
};
export const Icon: Story = {
  args: {
    variant: "primary",
    children: "Icon",
    size: "s",
    icon : <img src={Iconimg} width={16} />,
  }
};