import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextField from './TextField';
import './TextField.scss';

export default {
  title: 'Example/TextField',
  component: TextField,
  argTypes: {},
} as ComponentMeta<typeof TextField>;

const Template: ComponentStory<typeof TextField> = (args) => (
  <TextField {...args} />
);

export const Light = Template.bind({});
Light.args = {
  type: 'light',
  error: false,
  placeholder: 'Project name...'
};

export const Dark = Template.bind({});
Dark.args = {
  type: 'dark',
  error: false,
  placeholder: 'Project name...'
};

export const Error = Template.bind({});
Error.args = {
  type: 'dark',
  error: true,
  placeholder: 'Project name...'
};
