import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import DirectoryPicker from './DirectoryPicker';

export default {
  title: 'Example/DirectoryPicker',
  component: DirectoryPicker,
  argTypes: {},
} as ComponentMeta<typeof DirectoryPicker>;

const Template: ComponentStory<typeof DirectoryPicker> = (args) => (
  <DirectoryPicker {...args} />
);
export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Choose a directory...',
  onClick: () => {
    console.log('it_s alive!!!');
  },
};
