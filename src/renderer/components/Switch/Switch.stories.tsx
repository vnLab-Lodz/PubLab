import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Switch from './Switch';

export default {
  title: 'Example/Switch',
  component: Switch,
  argTypes: {},
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;
export const Normal = Template.bind({});
Normal.args = { disabled: false };
Normal.parameters = { backgrounds: { default: 'dark' } };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true, checked: true };
Disabled.parameters = { backgrounds: { default: 'dark' } };
