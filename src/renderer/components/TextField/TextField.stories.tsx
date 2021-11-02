import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OurTextField from './TextField';
import './TextField.scss';

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
    type: 'light',
    variant: 'outlined',
    placeholder: 'Project name ...'
};

export const Dark = Template.bind({});
Dark.args = {
    type: 'dark',
    variant: 'outlined',
    placeholder: 'Project name ...'
};

export const Error = Template.bind({});
Error.args = {
    type: 'error',
    variant: 'outlined',
    placeholder: 'Project name ...'
};
