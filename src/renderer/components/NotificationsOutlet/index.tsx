import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { debounce } from '@mui/material';
import {
  Notification as INotification,
  selectNotifications,
} from 'src/shared/redux/slices/notificationsSlice';
import * as Styled from './style';
import Notification, {
  NotificationText,
  NotificationTitle,
  NOTIFICATION_TYPES,
} from '../Notification/Notification';

const NotificationsOutlet = () => {
  const notifications = useSelector(selectNotifications);
  const [expandedId, setExpandedId] = useState<string | undefined>();
  const { t } = useTranslation();

  useEffect(() => {
    if (notifications.length === 0) return;
    const lastIndex = notifications.length - 1;
    setExpandedId(notifications[lastIndex].id);
  }, [notifications]);

  const debounceSetExpandedId = debounce(setExpandedId, 75);

  const getNotificationMessage = ({
    message,
    messageI18n,
    i18nParams,
  }: INotification) => {
    if (message) return message;
    if (messageI18n) return t(messageI18n as any, i18nParams);
    return '';
  };

  return (
    <Styled.NotificationsContainer>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          type={notification.type as NOTIFICATION_TYPES}
          isExpanded={expandedId === notification.id}
          expand={() => debounceSetExpandedId(notification.id)}
          id={notification.id}
          autoDismiss={notification.autoDismiss}
          delay={notification.delay}
        >
          {notification.title && (
            <NotificationTitle>{notification.title}</NotificationTitle>
          )}
          {(notification.message || notification.messageI18n) && (
            <NotificationText>
              {getNotificationMessage(notification)}
            </NotificationText>
          )}
        </Notification>
      ))}
    </Styled.NotificationsContainer>
  );
};

export default NotificationsOutlet;
