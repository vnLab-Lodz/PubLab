import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VersionDetails } from '../../../main/versionDetails';
import { SupportedLangCode } from '../../../renderer/internationalisation/i18next';
import { RootState } from '../rootReducer';

type Settings = {
  defaultDirPath: string;
  currentLocale: SupportedLangCode;
  versionDetails: VersionDetails;
};

const initialState: Settings = {
  defaultDirPath: '',
  currentLocale: 'en',
  versionDetails: {
    version: '',
    isUpToDate: false,
  },
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
    setVersionDetails: (
      state: Settings,
      action: PayloadAction<VersionDetails>
    ) => {
      state.versionDetails = action.payload;
    },
  },
});

export const { setDefaultDirPath, setLocale, setVersionDetails } =
  settingsSlice.actions;

export const selectDefaultDirPath = (state: RootState) =>
  state.appSettings.defaultDirPath;

export const selectCurrentLocale = (state: RootState) =>
  state.appSettings.currentLocale;

export const selectVersionDetails = (state: RootState) =>
  state.appSettings.versionDetails;

export default settingsSlice.reducer;
