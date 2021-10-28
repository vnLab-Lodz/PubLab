import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { SUBVIEWS, VIEWS } from '../../../renderer/constants/Views';

export interface ISubview {
  element: SUBVIEWS;
  props?: { [key: string]: any };
}

export type CurrentView = {
  view: VIEWS;
  subview: ISubview;
};

const initialState: CurrentView = {
  view: VIEWS.PROJECT,
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
});

export const { updateCurrentView, updateSubview } = CurrentViewSlice.actions;

export const selectCurrentView = (state: RootState) => state.currentView;

export default CurrentViewSlice.reducer;
