import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AuthButton from './AuthButton';
import GitHubIcon from '../../assets/github-icon.svg';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/AuthButton',
  component: AuthButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof AuthButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AuthButton> = (args) => (
  <AuthButton {...args} />
);

export const LogIn = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LogIn.args = {
  icon: <img src={GitHubIcon} alt='GitHub logo' />,
  children: 'Log in with GitHub',
};

export const Disabled = Template.bind({});
Disabled.args = {
  icon: <img src={GitHubIcon} />,
  children: 'Log in with GitHub',
  disabled: true,
};

export const LogOut = Template.bind({});
LogOut.args = {
  children: 'Yes, log me out.',
};
