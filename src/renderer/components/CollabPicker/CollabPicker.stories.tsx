import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CollabPicker from './CollabPicker';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/CollabPicker',
  component: CollabPicker,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CollabPicker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CollabPicker> = (args) => (
  <CollabPicker {...args} />
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  options: [
    { label: 'Programmer', value: 'programmer' },
    { label: 'Designer', value: 'designer' },
  ],
};
Default.parameters = { backgrounds: { default: 'dark' } };
