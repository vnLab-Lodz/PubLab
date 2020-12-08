import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

type Directory = {
  path: string;
  date: string;
};

type CurrentDirectories = {
  selectedDirectory: Directory;
  hasDirectoryBeenSaved: Boolean;
};

const initialState: CurrentDirectories = {
  selectedDirectory: { path: '-', date: undefined },
  hasDirectoryBeenSaved: false,
};

const DirectoriesSlice = createSlice({
  name: 'directories',
  initialState: initialState,
  reducers: {
    updateCurrentDirectory: (
      state: CurrentDirectories,
      action: PayloadAction<string>
    ) => {
      state.selectedDirectory = {
        path: action.payload,
        date: new Date().toString(),
      };
    },
    setHasDirectoryBeenSaved: (
      state: CurrentDirectories,
      action: PayloadAction<boolean>
    ) => {
      state.hasDirectoryBeenSaved = action.payload;
    },
  },
});

export const {
  updateCurrentDirectory,
  setHasDirectoryBeenSaved,
} = DirectoriesSlice.actions;

export const selectCurrentDirectory = (state: RootState) =>
  state.currentDirectory.selectedDirectory;
export const selectHasDirectoryBeenSaved = (state: RootState) =>
  state.currentDirectory.hasDirectoryBeenSaved;

export default DirectoriesSlice.reducer;
