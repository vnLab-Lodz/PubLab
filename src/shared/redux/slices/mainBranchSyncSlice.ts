import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BranchComparison } from '../../types';
import { RootState } from '../rootReducer';

const initialState: {
  status: BranchComparison;
  wasUserNotified: boolean;
} = { status: { ahead: 0, behind: 0 }, wasUserNotified: false };

const mainBranchSyncSlice = createSlice({
  name: 'mainBranchSync',
  initialState,
  reducers: {
    setMainBranchStatus: (state, action: PayloadAction<BranchComparison>) => {
      state.status = action.payload;
    },
    setWasUserNotified: (state, action: PayloadAction<boolean>) => {
      state.wasUserNotified = action.payload;
    },
  },
});

export const { setMainBranchStatus, setWasUserNotified } =
  mainBranchSyncSlice.actions;

export const selectMainBranchSync = (state: RootState) => state.mainBranchSync;

export default mainBranchSyncSlice.reducer;
