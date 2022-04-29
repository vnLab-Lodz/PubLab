import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export interface Loader {
  id: string;
  message?: string;
  i18n?: { key: string; params?: { [key: string]: string }; default?: string };
}

type LoaderModification =
  | {
      id: string;
      key: keyof Omit<Loader, 'id' | 'i18n'>;
      value: string;
    }
  | {
      id: string;
      key: 'i18n';
      value: {
        key: string;
        params?: { [key: string]: string };
        default?: string;
      };
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
      if (loader) loader[action.payload.key] = action.payload.value as any;
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
