import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {Subviews, Views} from '../../renderer/constants/VIEWS';

export type CurrentView = {
  view: Views;
  subview: Subviews;
};

const initialState: CurrentView = {view: Views.PROJECT, subview: Subviews.NONE};

const CurrentViewSlice = createSlice({
  name: 'CurrentView',
  initialState: initialState,
  reducers: {
    updateCurrentView: (
      state: CurrentView,
      action: PayloadAction<Views>
    ) => {
      state.view = action.payload;
      state.subview = Subviews.NONE;
    },
    updateSubview: (state: CurrentView, action: PayloadAction<Subviews>) => {
      state.subview = action.payload;
    }
  },
});

export const {updateCurrentView, updateSubview} = CurrentViewSlice.actions;

export const selectCurrentView = (state: RootState) => state.currentView;

export default CurrentViewSlice.reducer;
