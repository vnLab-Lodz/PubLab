import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TextArea from './TextArea';

export default {
  title: 'Example/TextArea',
  component: TextArea,
  argTypes: {},
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const Light = Template.bind({});
Light.args = {
  type: 'light',
  placeholder: 'Project name ...',
};

export const Dark = Template.bind({});
Dark.args = {
  type: 'dark',
  placeholder: 'Project name ...',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  placeholder: 'Project name ...',
};
