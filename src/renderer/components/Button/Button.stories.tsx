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
  color: 'inherit',
  children: 'Log in with GitHub',
  textCase: 'sentence-case',
  fullWidth: true,
};

export const SentenceCase = Template.bind({});
SentenceCase.args = {
  variant: 'contained',
  color: 'inherit',
  children: 'Yes, log me out.',
  textCase: 'sentence-case',
  fullWidth: true,
};

export const LightUppercase = Template.bind({});
LightUppercase.args = {
  variant: 'contained',
  color: 'inherit',
  children: 'choose',
  textCase: 'uppercase',
  fontWeight: 'light',
  fullWidth: true,
};

export const BoldUppercase = Template.bind({});
BoldUppercase.args = {
  variant: 'contained',
  color: 'green',
  children: "let's go",
  textCase: 'uppercase',
  fontWeight: 'bold',
  fullWidth: true,
};

export const DarkOutline = Template.bind({});
DarkOutline.args = {
  variant: 'outlined',
  children: 'back',
  textCase: 'uppercase',
  fontWeight: 'bold',
  fullWidth: true,
};
