import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { installGatsby } from '../../main/node/gatsby';
import { createAsyncActionMain } from '../helpers/createActionMain';

type GatsbyInstall = {
  installing: boolean;
  success: boolean | null;
};

export const installGatsbyCLI = createAsyncActionMain<void>(
  'installGatsby',
  () => {
    return async (dispatch) => {
      dispatch(installPending());
      await installGatsby()
        .then(() => {
          dispatch(installFulfilled());
        })
        .catch(() => {
          dispatch(installRejected());
        });
    };
  }
);

const initialState: GatsbyInstall = { installing: false, success: null };

const gatsbyInstallSlice = createSlice({
  name: 'gatsbyInstall',
  initialState: initialState,
  reducers: {
    installPending: (state) => {
      state.installing = true;
    },
    installFulfilled: () => {
      return { installing: false, success: true };
    },
    installRejected: () => {
      return { installing: false, success: false };
    },
  },
});

export const {
  installPending,
  installFulfilled,
  installRejected,
} = gatsbyInstallSlice.actions;

export const selectGatsbyInstallStatus = (state: RootState) => state.gatsbyInstall;

export default gatsbyInstallSlice.reducer;
