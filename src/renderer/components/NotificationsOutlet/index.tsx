import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNotifications } from 'src/shared/redux/slices/notificationsSlice';
import { debounce } from '@mui/material';
import Notification, {
  NotificationText,
  NotificationTitle,
  NOTIFICATION_TYPES,
} from '../Notification/Notification';
import * as Styled from './style';

const NotificationsOutlet = () => {
  const notifications = useSelector(selectNotifications);
  const [expandedId, setExpandedId] = useState<string | undefined>();

  useEffect(() => {
    if (notifications.length === 0) return;
    const lastIndex = notifications.length - 1;
    setExpandedId(notifications[lastIndex].id);
  }, [notifications]);

  const debounceSetExpandedId = debounce(setExpandedId, 75);

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
          {notification.message && (
            <NotificationText>{notification.message}</NotificationText>
          )}
        </Notification>
      ))}
    </Styled.NotificationsContainer>
  );
};

export default NotificationsOutlet;
