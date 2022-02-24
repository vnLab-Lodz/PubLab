import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';
import GitHubIcon from '../../assets/github-icon.svg';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const WithIcon = Template.bind({});
WithIcon.args = {
  startIcon: <img src={GitHubIcon} alt='GitHub logo' />,
  variant: 'contained',
  children: 'Log in with GitHub',
  textCase: 'sentence-case',
  fullWidth: true,
};

export const SentenceCase = Template.bind({});
SentenceCase.args = {
  variant: 'contained',
  children: 'Yes, log me out.',
  textCase: 'sentence-case',
  fullWidth: true,
};

export const Uppercase = Template.bind({});
Uppercase.args = {
  variant: 'contained',
  children: 'choose',
  textCase: 'uppercase',
  fullWidth: true,
};

export const BoldUppercaseGreen = Template.bind({});
BoldUppercaseGreen.args = {
  variant: 'contained',
  color: 'green',
  isMajor: true,
  children: "let's go",
  textCase: 'uppercase',
  fullWidth: true,
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outlined',
  children: 'back',
  textCase: 'uppercase',
  fullWidth: true,
};
