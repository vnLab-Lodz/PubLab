import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  notificationInterval: NOTIFICATION_INTERVAL;
};

const initialState: Settings = {
  defaultDirPath: '',
  currentLocale: 'en',
  notificationInterval: NOTIFICATION_INTERVAL.INSTANT,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state: Settings, action: PayloadAction<Settings>) =>
      action.payload,
  },
});

const { setSettings } = settingsSlice.actions;

export const selectAllSettings = (state: RootState) => state.appSettings;

export const selectDefaultDirPath = (state: RootState) =>
  state.appSettings.defaultDirPath;

export const selectCurrentLocale = (state: RootState) =>
  state.appSettings.currentLocale;

export const saveSettingsAsync = createAsyncActionMain<Partial<Settings>>(
  'saveSettings',
  (settings) => async (dispatch, getState) => {
    const nextSettings = { ...getState().appSettings, ...settings };
    dispatch(setSettings(nextSettings));
    writeJSON(SETTINGS_FILE_PATH, nextSettings);
  }
);

export const readSettingsAsync = createAsyncActionMain<void>(
  'readSettings',
  () => async (dispatch) => {
    const settings = readJSON(SETTINGS_FILE_PATH) as Settings;
    dispatch(setSettings(settings));
  }
);

export default settingsSlice.reducer;
