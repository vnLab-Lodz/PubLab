import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SupportedLangCode } from '../../../renderer/localisation/i18next';
import { RootState } from '../rootReducer';

type Settings = {
  defaultDirPath: string;
  currentLocale: SupportedLangCode;
};

const initialState: Settings = {
  defaultDirPath: '',
  currentLocale: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDefaultDirPath: (state: Settings, action: PayloadAction<string>) => {
      state.defaultDirPath = action.payload;
    },
    setLocale: (state: Settings, action: PayloadAction<SupportedLangCode>) => {
      state.currentLocale = action.payload;
    },
  },
});

export const { setDefaultDirPath, setLocale } = settingsSlice.actions;

export const selectDefaultDirPath = (state: RootState) =>
  state.appSettings.defaultDirPath;

export const selectCurrentLocale = (state: RootState) =>
  state.appSettings.currentLocale;

export default settingsSlice.reducer;
