import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MenuItem from '@mui/material/MenuItem';
import BasicSelect from './Select';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/BasicSelect',
  component: BasicSelect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof BasicSelect>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BasicSelect> = (args) => {
  const [value, setValue] = useState('');

  return (
    <BasicSelect
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <MenuItem value='programmer'>Programmer</MenuItem>
      <MenuItem value='designer'>Designer</MenuItem>
    </BasicSelect>
  );
};

export const Normal = Template.bind({});
Normal.args = { placeholder: 'Role' };
Normal.parameters = { backgrounds: { default: 'dark' } };

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Role',
  disabled: true,
  sx: { minWidth: '200px' },
};
Disabled.parameters = { backgrounds: { default: 'dark' } };
