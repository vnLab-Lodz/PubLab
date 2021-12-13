import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { SUBVIEWS, VIEWS } from '../../../renderer/constants/Views';
import { terminateSessionFulfilled } from './currentUserSlice';
import { getLocalStorageItem } from '../helpers/localStorage';

export interface ISubview {
  element: SUBVIEWS;
  props?: { [key: string]: any };
}

export type CurrentView = {
  view: VIEWS;
  subview: ISubview;
};

const initialState: CurrentView = {
  view: getLocalStorageItem<boolean>('initialConfigFlag', JSON.parse)
    ? VIEWS.PROJECT
    : VIEWS.FIRST_TIME,
  subview: { element: SUBVIEWS.NONE },
};

const CurrentViewSlice = createSlice({
  name: 'CurrentView',
  initialState,
  reducers: {
    updateCurrentView: (state: CurrentView, action: PayloadAction<VIEWS>) => {
      state.view = action.payload;
      state.subview = { element: SUBVIEWS.NONE };
    },
    updateSubview: (state: CurrentView, action: PayloadAction<ISubview>) => {
      state.subview = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(terminateSessionFulfilled, () => initialState);
  },
});

export const { updateCurrentView, updateSubview } = CurrentViewSlice.actions;

export const selectCurrentView = (state: RootState) => state.currentView;

export default CurrentViewSlice.reducer;
