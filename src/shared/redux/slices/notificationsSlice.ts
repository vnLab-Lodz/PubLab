import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NOTIFICATION_TYPES } from 'src/renderer/components/Notification/Notification';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../rootReducer';

export interface Notification {
  id: string;
  type: Lowercase<keyof typeof NOTIFICATION_TYPES>;
  autoDismiss?: boolean;
  delay?: number;
  title?: string;
  message?: string;
  i18n?: { key: string; params?: { [key: string]: string } };
}

const initialState: Notification[] = [];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    sendNotification: (
      state,
      action: PayloadAction<Omit<Notification, 'id'>>
    ) => {
      if (action.payload.message && action.payload.i18n) {
        throw new Error("Can't pass message and i18n to the same notification");
      }

      state.push({ id: uuidv4(), ...action.payload });
    },
    dismissNotification: (state, action: PayloadAction<string>) => {
      state.splice(
        state.findIndex((n) => n.id === action.payload),
        1
      );
    },
  },
});

export const { sendNotification, dismissNotification } =
  notificationsSlice.actions;

export const selectNotifications = (state: RootState) => state.notifications;

export default notificationsSlice.reducer;
