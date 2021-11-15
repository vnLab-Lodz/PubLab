import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ImagePicker from './ImagePicker';

export default {
  title: 'Example/ImagePicker',
  component: ImagePicker,
  argTypes: {},
} as ComponentMeta<typeof ImagePicker>;

const Template: ComponentStory<typeof ImagePicker> = (args) => (
  <ImagePicker {...args} />
);

export const ImgDefault = Template.bind({});
ImgDefault.args = {
  image: undefined,
  error: false,
};

export const ImgSelected = Template.bind({});
ImgSelected.args = {
  image: 'https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg', // random picture
  error: false,
};

export const ImgError = Template.bind({});
ImgError.args = {
  image: undefined,
  error: true,
};
