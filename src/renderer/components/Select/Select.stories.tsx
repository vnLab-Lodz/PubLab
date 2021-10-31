import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BasicSelect from './Select';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/BasicSelect',
  component: BasicSelect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof BasicSelect>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BasicSelect> = (args) => (
  <BasicSelect {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
   disabled: false, placeholder: "Role", options: ["Programmer", "asaa"], onChange: () => {console.log("ssacasca")}
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true, options: ["la", "asaa"], onChange: () => {console.log("ssacasca")}
};