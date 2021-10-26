import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OurSwitch from './Switch';


export default {
  title: 'Example/OurSwitch',
  component: OurSwitch,
    argTypes: {},
} as ComponentMeta<typeof OurSwitch>;

const Template: ComponentStory<typeof OurSwitch> = (args) => (
  <OurSwitch {...args} />
);

export const Checked = Template.bind({});
Checked.args = {
    disabled: false,
}

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};