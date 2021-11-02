import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OurTextField from './TextField';

export default {
  title: 'Example/OurTextField',
  component: OurTextField,
    argTypes: {},
} as ComponentMeta<typeof OurTextField>;

const Template: ComponentStory<typeof OurTextField> = (args) => (
  <OurTextField {...args} />
);


export const Light = Template.bind({});
Light.args = {
    variant: 'outlined',
    placeholder: 'Project name ...'      
};

export const Dark = Template.bind({});
Dark.args = {
    variant: 'outlined',
    placeholder: 'Project name ...'
};

export const Error = Template.bind({});
Error.args = {
    variant: 'outlined',
    placeholder: 'Project name ...',
    error: true
};
