import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { COMPONENTS } from '../../renderer/constants/Components';

type CurrentView = {
  view: COMPONENTS;
};

const initialState: CurrentView = { view: COMPONENTS.PROJECT };

const CurrentViewSlice = createSlice({
  name: 'CurrentView',
  initialState: initialState,
  reducers: {
    updateCurrentView: (
      state: CurrentView,
      action: PayloadAction<COMPONENTS>
    ) => {
      state.view = action.payload;
    },
  },
});

export const { updateCurrentView } = CurrentViewSlice.actions;

export const selectCurrentView = (state: RootState) => state.currentView;

export default CurrentViewSlice.reducer;
