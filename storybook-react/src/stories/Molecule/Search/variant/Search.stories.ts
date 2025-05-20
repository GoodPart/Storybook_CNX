import type { Meta, StoryObj } from '@storybook/react';

// import Search from './Search';
import Search from "../../../../../../shared/components/component/react/molecule/Search/Search"

const meta = {
    title: 'Molecule/Search/variant',
    component: Search,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],
    // argTypes: {
      // backgroundColor: { control: 'color' },
    // },
    // args: { onClick: fn() },
  } satisfies Meta<typeof Search>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;

  export const Default:Story = {
    
  }