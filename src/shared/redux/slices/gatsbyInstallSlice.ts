import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { installGatsby, checkForGatsby } from '../../../main/node/gatsby';
import { createAsyncActionMain } from '../helpers/createActionMain';

type GatsbyInstall = {
  installing: boolean;
  installSuccess: boolean | null;
  checkingInstall: boolean;
};

const initialState: GatsbyInstall = {
  installing: false,
  installSuccess: null,
  checkingInstall: false,
};

const gatsbyInstallSlice = createSlice({
  name: 'gatsbyInstall',
  initialState,
  reducers: {
    installExecuting: () => ({
      installing: true,
      installSuccess: null,
      checkingInstall: false,
    }),
    installFulfilled: () => ({
      installing: false,
      installSuccess: true,
      checkingInstall: false,
    }),
    installRejected: () => ({
      installing: false,
      installSuccess: false,
      checkingInstall: false,
    }),
    checkRejected: () => ({
      installing: false,
      installSuccess: null,
      checkingInstall: false,
    }),
    checkingInstall: () => ({
      installing: false,
      installSuccess: null,
      checkingInstall: true,
    }),
  },
});

export const {
  installExecuting,
  installFulfilled,
  installRejected,
  checkRejected,
  checkingInstall,
} = gatsbyInstallSlice.actions;

export const selectGatsbyInstallStatus = (state: RootState) =>
  state.gatsbyInstall;

export const installGatsbyCLI = createAsyncActionMain<void>(
  'installGatsby',
  () => async (dispatch) => {
    dispatch(checkingInstall());
    const isInstalled = await checkForGatsby().catch(() =>
      dispatch(checkRejected())
    );

    if (isInstalled) {
      dispatch(installFulfilled());
    } else {
      dispatch(installExecuting());
      installGatsby()
        .then(() => {
          dispatch(installFulfilled());
        })
        .catch(() => {
          dispatch(installRejected());
        });
    }
  }
);

export default gatsbyInstallSlice.reducer;
