import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

type Settings = {
  defaultDirPath: string;
};

const initialState: Settings = { defaultDirPath: '' };

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDefaultDirPath: (state: Settings, action: PayloadAction<string>) => {
      state.defaultDirPath = action.payload;
    },
  },
});

export const { setDefaultDirPath } = settingsSlice.actions;

export const selectDefaultDirPath = (state: RootState) =>
  state.appSettings.defaultDirPath;

export default settingsSlice.reducer;
