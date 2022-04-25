import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

interface Loader {
  id: string;
  message: string;
}

type LoaderModification = {
  id: string;
  key: keyof Omit<Loader, 'id'>;
  value: string;
};

const initialState: Loader[] = [];

const loadersSlice = createSlice({
  name: 'loaders',
  initialState,
  reducers: {
    addLoader: (state, action: PayloadAction<Loader>) => {
      state.push(action.payload);
    },
    removeLoader: (state, action: PayloadAction<string>) => {
      state.splice(
        state.findIndex((loader) => loader.id === action.payload),
        1
      );
    },
    modifyLoader: (state, action: PayloadAction<LoaderModification>) => {
      const loader = state.find((l) => l.id === action.payload.id);
      if (loader) loader[action.payload.key] = action.payload.value;
    },
  },
});

export const { addLoader, removeLoader, modifyLoader } = loadersSlice.actions;

export const selectLoaders = (state: RootState) => state.loaders;

export const selectLoader = createSelector(
  selectLoaders,
  (_: RootState, id: string) => id,
  (loaders, id) => loaders.find((l) => l.id === id)
);

export default loadersSlice.reducer;
