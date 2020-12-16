import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

type Config = {
  defaultDirPath: string;
};

const initialState: Config = { defaultDirPath: '' };

const configSlice = createSlice({
  name: 'config',
  initialState: initialState,
  reducers: {
    setDefaultDirPath: (state: Config, action: PayloadAction<string>) => {
      state.defaultDirPath = action.payload;
    },
  },
});

export const { setDefaultDirPath } = configSlice.actions;

export const selectDefaultDirPath = (state: RootState) =>
  state.appConfig.defaultDirPath;

export default configSlice.reducer;
