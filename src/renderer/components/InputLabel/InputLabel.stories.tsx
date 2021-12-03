import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputLabel from './InputLabel';

export default {
  title: 'Example/InputLabel',
  component: InputLabel,
  argTypes: {},
} as ComponentMeta<typeof InputLabel>;

const Template: ComponentStory<typeof InputLabel> = (args) => (
  <InputLabel {...args} />
);

export const Base = Template.bind({});
Base.args = {
  children: 'Language:',
};

export const Green = Template.bind({});
Green.args = {
  children: 'Language:',
  sx: {
    color: (theme) => theme.palette.green.main,
  },
};
