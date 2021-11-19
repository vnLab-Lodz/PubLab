import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VersionDetails } from '../../../main/versionDetails';
import { SupportedLangCode } from '../../../renderer/internationalisation/i18next';
import { RootState } from '../rootReducer';

export enum NOTIFICATION_INTERVAL { // TODO: Define it in better place when the notification implementation is ready
  INSTANT = 'instant',
}

export type Settings = {
  defaultDirPath: string;
  currentLocale: SupportedLangCode;
  versionDetails: VersionDetails;
  notificationInterval: NOTIFICATION_INTERVAL;
};

const initialState: Settings = {
  defaultDirPath: '',
  currentLocale: 'en',
  versionDetails: {
    version: '',
    isUpToDate: false,
  },
  notificationInterval: NOTIFICATION_INTERVAL.INSTANT,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAllSettings: (state: Settings, action: PayloadAction<Settings>) =>
      action.payload,
    setDefaultDirPath: (state: Settings, action: PayloadAction<string>) => {
      state.defaultDirPath = action.payload;
    },
    setLocale: (state: Settings, action: PayloadAction<SupportedLangCode>) => {
      state.currentLocale = action.payload;
    },
    setVersionDetails: (
      state: Settings,
      action: PayloadAction<VersionDetails>
    ) => {
      state.versionDetails = action.payload;
    },
  },
});

export const {
  setAllSettings,
  setDefaultDirPath,
  setLocale,
  setVersionDetails,
} = settingsSlice.actions;

export const selectAllSettings = (state: RootState) => state.appSettings;

export const selectDefaultDirPath = (state: RootState) =>
  state.appSettings.defaultDirPath;

export const selectCurrentLocale = (state: RootState) =>
  state.appSettings.currentLocale;

export const selectVersionDetails = (state: RootState) =>
  state.appSettings.versionDetails;

export default settingsSlice.reducer;
