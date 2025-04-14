import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input.tsx';

const meta = {
    title : 'Input/Components/Input',
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