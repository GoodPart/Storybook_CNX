import type { Meta, StoryObj } from '@storybook/react';

// import Input from './Input.js';
import Input from '../../../../../shared/components/component/react/atom/Input/Input';

const meta = {
    title : 'Atom/Input/variant',
    component : Input,
    parameters: {
       layout: 'centered',
    },
    
} satisfies Meta<typeof Input>

export default meta;

type Story = StoryObj<typeof meta>

export const Default:Story = {
    args : {
        placeholder : 'Search',
        type : 'text',
        value : '',
        themeColor : 'default',
        size : 's',
        disabled : false
    }
}

export const Primary: Story = {
    args: {
        placeholder: "Search",
        type: "text",
        value: "",
        themeColor: "primary",
        size: "s",
        disabled: false
    }
};

export const Warring: Story = {
    args: {
        placeholder: "Search",
        type: "text",
        value: "",
        themeColor: "warring",
        size: "s",
        disabled: false
    }
};