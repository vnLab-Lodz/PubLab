import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VersionDetails } from '../../../main/versionDetails';
import { SupportedLangCode } from '../../../renderer/internationalisation/i18next';
import { createAsyncActionMain } from '../helpers/createActionMain';
import { RootState } from '../rootReducer';
import { readJSON, writeJSON } from '../../../main/node/fileIO/json';
import app from '../../utils/app';

const SETTINGS_FILE_PATH = `${app.getPath('userData')}/publab-settings.json`;

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
    setAllSettings: (
      state: Settings,
      action: PayloadAction<Partial<Settings>>
    ) => ({ ...state, ...action.payload }),
  },
});

const { setAllSettings } = settingsSlice.actions;

export const selectAllSettings = (state: RootState) => state.appSettings;

export const selectDefaultDirPath = (state: RootState) =>
  state.appSettings.defaultDirPath;

export const selectCurrentLocale = (state: RootState) =>
  state.appSettings.currentLocale;

export const selectVersionDetails = (state: RootState) =>
  state.appSettings.versionDetails;

export const saveSettingsThunk = createAsyncActionMain<Partial<Settings>>(
  'saveSettings',
  (settings) => async (dispatch) => {
    dispatch(setAllSettings(settings));
    writeJSON(SETTINGS_FILE_PATH, settings);
  }
);

export const readSettingsThunk = createAsyncActionMain<void>(
  'readSettings',
  () => async (dispatch) => {
    const settings = readJSON(SETTINGS_FILE_PATH);
    dispatch(setAllSettings(settings));
  }
);

export default settingsSlice.reducer;
