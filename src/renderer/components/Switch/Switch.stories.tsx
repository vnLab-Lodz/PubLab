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

export const Normal = Template.bind({});
Normal.args = {
    disabled: false,
    onChange: () => {
      console.log('123');
    }
}

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};