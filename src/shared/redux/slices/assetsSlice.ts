import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssetObject } from '../../types';
import { RootState } from '../rootReducer';

export interface Assets {
  [key: string]: AssetObject;
}

const initialState: Assets = {};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    addAsset: (
      state,
      action: PayloadAction<{
        path: string;
        asset: AssetObject;
      }>
    ) => {
      const { path, asset } = action.payload;
      state[path] = asset;
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { addAsset, removeAsset } = assetsSlice.actions;

export const selectAsset = (state: RootState, path: string) =>
  state.assets[path];

export default assetsSlice.reducer;
