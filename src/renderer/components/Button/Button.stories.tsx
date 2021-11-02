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
  children: 'With icon',
};
