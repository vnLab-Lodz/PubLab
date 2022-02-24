import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextField from './TextField';

export default {
  title: 'Example/TextField',
  component: TextField,
  argTypes: {},
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const Base = Template.bind({});
Base.args = {
  error: false,
  placeholder: 'Project name...',
};

export const Error = Template.bind({});
Error.args = {
  error: true,
  placeholder: 'Project name...',
};
