import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OurTextArea from './OurTextArea';

export default {
  title: 'Example/OurTextArea',
  component: OurTextArea,
  argTypes: {},
} as ComponentMeta<typeof OurTextArea>;

const Template: ComponentStory<typeof OurTextArea> = (args) => (
  <OurTextArea {...args} />
);

export const Light = Template.bind({});
Light.args = {
  type: 'light',
  variant: 'outlined',
  placeholder: 'Project name ...',
};

export const Dark = Template.bind({});
Dark.args = {
  type: 'dark',
  variant: 'outlined',
  placeholder: 'Project name ...',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  variant: 'outlined',
  placeholder: 'Project name ...',
};
