import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SupportedLangCode } from '../../../renderer/internationalisation/i18next';
import { RootState } from '../rootReducer';

export enum NOTIFICATION_INTERVAL { // TODO: Define it in better place when the notification implementation is ready
  INSTANT = 'instant',
}

export type SyncLocations = Array<{ name: string; enabled: boolean }>;

export type Settings = {
  defaultDirPath: string;
  currentLocale: SupportedLangCode;
  notificationInterval: NOTIFICATION_INTERVAL;
  syncLocations: SyncLocations;
};

const initialState: Settings = {
  defaultDirPath: '',
  currentLocale: 'en',
  notificationInterval: NOTIFICATION_INTERVAL.INSTANT,
  syncLocations: [],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (_, action: PayloadAction<Settings>) => action.payload,
  },
});

export const { setSettings } = settingsSlice.actions;

export const selectAllSettings = (state: RootState) => state.appSettings;

export const selectDefaultDirPath = (state: RootState) =>
  state.appSettings.defaultDirPath;

export const selectCurrentLocale = (state: RootState) =>
  state.appSettings.currentLocale;

export const selectSyncLocations = (state: RootState) =>
  state.appSettings.syncLocations;

export default settingsSlice.reducer;
