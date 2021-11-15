import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OurRadio from './RadioGroup';


export default {
  title: 'Example/OurSwitch',
  component: OurRadio,
    argTypes: {},
} as ComponentMeta<typeof OurRadio>;

const Template: ComponentStory<typeof OurRadio> = (args) => (
  <OurRadio {...args} />
);
export const Normal = Template.bind({});
Normal.args = {
    disabled: false,
    onChange: () => {
      console.log('123');
    }
};


export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};