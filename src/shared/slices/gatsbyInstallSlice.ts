import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { installGatsby, checkForGatsby } from '../../main/node/gatsby';
import { createAsyncActionMain } from '../helpers/createActionMain';

type GatsbyInstall = {
  installing: boolean;
  installSuccess: boolean | null;
  checkingInstall: boolean;
};

export const installGatsbyCLI = createAsyncActionMain<void>('installGatsby', () => {
  return async (dispatch) => {
    dispatch(checkingInstall());
    let isInstalled = await checkForGatsby().catch(() => dispatch(checkRejected()));

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
  };
});

const initialState: GatsbyInstall = { installing: false, installSuccess: null, checkingInstall: false };

const gatsbyInstallSlice = createSlice({
  name: 'gatsbyInstall',
  initialState: initialState,
  reducers: {
    installExecuting: () => {
      return { installing: true, installSuccess: null, checkingInstall: false };
    },
    installFulfilled: () => {
      return { installing: false, installSuccess: true, checkingInstall: false };
    },
    installRejected: () => {
      return { installing: false, installSuccess: false, checkingInstall: false };
    },
    checkRejected: () => {
      return { installing: false, installSuccess: null, checkingInstall: false };
    },
    checkingInstall: () => {
      return { installing: false, installSuccess: null, checkingInstall: true };
    }
  },
});

export const { installExecuting, installFulfilled, installRejected, checkRejected, checkingInstall } = gatsbyInstallSlice.actions;

export const selectGatsbyInstallStatus = (state: RootState) => state.gatsbyInstall;

export default gatsbyInstallSlice.reducer;
