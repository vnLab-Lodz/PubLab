import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {Subviews, Views} from '../../renderer/constants/VIEWS';

export interface ISubview {
  element: Subviews;
  props?: { [key: string]: any };
}

export type CurrentView = {
  view: Views;
  subview: ISubview;
};

const initialState: CurrentView = {view: Views.PROJECT, subview: {element: Subviews.NONE}};

const CurrentViewSlice = createSlice({
  name: 'CurrentView',
  initialState: initialState,
  reducers: {
    updateCurrentView: (
      state: CurrentView,
      action: PayloadAction<Views>
    ) => {
      state.view = action.payload;
      state.subview = {element: Subviews.NONE};
    },
    updateSubview: (state: CurrentView, action: PayloadAction<ISubview>) => {
      state.subview = {...action.payload};
    }
  },
});

export const {updateCurrentView, updateSubview} = CurrentViewSlice.actions;

export const selectCurrentView = (state: RootState) => state.currentView;

export default CurrentViewSlice.reducer;
