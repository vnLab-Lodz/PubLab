import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OurRadio from './RadioGroup';


export default {
  title: 'Example/OurRadio',
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

export const DefaultNPM = Template.bind({});
DefaultNPM.args = {
  defaults: "npm",

};


export const DefaultYarn = Template.bind({});
DefaultYarn.args = {
  defaults: "yarn",
};

export const Disabled1 = Template.bind({});
Disabled1.args = {
  disabled1: true,
};

export const Disabled2 = Template.bind({});
Disabled2.args = {
  disabled2: true,
};

export const DisabledBoth = Template.bind({});
DisabledBoth.args = {
  disabled1: true,
  disabled2: true,
};