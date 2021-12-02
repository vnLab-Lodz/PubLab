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

export const Base = Template.bind({});
Base.args = {
  placeholder: 'Project name ...',
};

export const Error = Template.bind({});
Error.args = {
  error: true,
  placeholder: 'Project name ...',
};
