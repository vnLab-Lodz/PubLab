import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

type DataTypeExample = {
  nick: string;
};

type CurrentUser = {
  data: DataTypeExample;
  // For example extend by tokens
  // auth: {
  //   accessToken: string;
  //   refreshToken: string;
  // }
};

const initialState: CurrentUser = { data: { nick: '' } };

const currentUserSlice = createSlice({
  name: 'currentuser',
  initialState: initialState,
  reducers: {
    // State in reducers written with Toolkit is not immutable so to mutate single properties you can do this
    example: (state: CurrentUser, action: PayloadAction<DataTypeExample>) => {
      state.data = action.payload;
    },
    // If you want to mutate a whole state simply return the payload
    exampleLocal: {
      reducer: (_state: CurrentUser, action: PayloadAction<CurrentUser>) => {
        return action.payload;
      },
      // If you want to create a local action use prepare callback to do specify it in meta
      prepare: (payload: CurrentUser) => {
        return { payload, meta: { scope: 'local' } };
      },
    },
  },
});

// export actions from slice
export const { example, exampleLocal } = currentUserSlice.actions;

// selector for current user | note the use of RootState type here, it's necessary as selectors access whole state of the store
export const selectCurrentUser = (state: RootState) => state.currentUser;

export default currentUserSlice.reducer;
