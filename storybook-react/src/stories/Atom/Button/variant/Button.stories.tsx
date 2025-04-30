import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Iconimg from "../../../../assets/arrow-left.svg"

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
    size : "m",
    disabled : false
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
    children: "Button",
    size: "m",
    icon : <img src={Iconimg} width={16} />,
  },
  parameters : {
    design : {
      type : "figma",
      url : "https://www.figma.com/design/GHz252c4xWEAoJVQojoGxK/Design-System-CNX?node-id=459-2843&m=dev"
    }
  }
};