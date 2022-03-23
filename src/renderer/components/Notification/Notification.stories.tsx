import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Notification, {
  NotificationText,
  NotificationTitle,
  NOTIFICATION_TYPES,
} from './Notification';

export default {
  title: 'Example/Notification',
  component: Notification,
  argTypes: {},
} as ComponentMeta<typeof Notification>;

const Template: ComponentStory<typeof Notification> = (args) => (
  <Notification {...args} />
);

const children = (
  <>
    <NotificationTitle>Notification title</NotificationTitle>
    <NotificationText>
      This is some text that can be put in the notification
    </NotificationText>
  </>
);

export const Blank = Template.bind({});
Blank.args = { type: NOTIFICATION_TYPES.INFO };

export const Info = Template.bind({});
Info.args = { type: NOTIFICATION_TYPES.INFO, children };

export const Error = Template.bind({});
Error.args = { type: NOTIFICATION_TYPES.ERROR, children };

export const Warning = Template.bind({});
Warning.args = { type: NOTIFICATION_TYPES.WARNING, children };

export const Success = Template.bind({});
Success.args = { type: NOTIFICATION_TYPES.SUCCESS, children };
