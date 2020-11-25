import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { components } from '../../renderer/constants/RouterComponents';
import { RootState } from '../rootReducer';

type CurrentView = {
  component: React.FC,
  view: string
};

const initialState: CurrentView = { component: components["description"].component, view: "description" };

const CurrentViewSlice = createSlice({
  name: 'CurrentView',
  initialState: initialState,
  reducers: {
    updateCurrentView: (state: CurrentView, action: PayloadAction<string>) => {
      state.component = components[action.payload].component;
      state.view = action.payload;
    },
  },
});

// export actions from slice
export const { updateCurrentView } = CurrentViewSlice.actions;

// selector for current user | note the use of RootState type here, it's necessary as selectors access whole state of the store
export const selectCurrentView = (state: RootState) => state.currentView;

export default CurrentViewSlice.reducer;
