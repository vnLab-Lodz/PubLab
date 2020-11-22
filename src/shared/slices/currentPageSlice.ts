import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COMPONENTS_LIST } from '../../renderer/constants/componentsEnum';
import { createActionMain } from '../helpers/createActionMain';
import { RootState } from '../rootReducer';

type CurrentPage = {
  page: string;
};

const initialState: CurrentPage = { page: COMPONENTS_LIST.COMPONENT2 };

const CurrentPageSlice = createSlice({
  name: 'CurrentPage',
  initialState: initialState,
  reducers: {
    updateCurrentPage: (state: CurrentPage, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
  },
});

// export actions from slice
export const { updateCurrentPage } = CurrentPageSlice.actions;

// selector for current user | note the use of RootState type here, it's necessary as selectors access whole state of the store
export const selectCurrentPage = (state: RootState) => state.currentPage;

export default CurrentPageSlice.reducer;
