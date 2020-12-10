import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { checkForNode } from '../../main/node/nodeCheck';
import { createAsyncActionMain } from '../helpers/createActionMain';

type NodeCheck = {
  installed: boolean | null;
  checkingInstall: boolean;
};

export const checkNode = createAsyncActionMain<void>('checkForNode', () => {
  return async (dispatch) => {
    dispatch(checkingInstallation());
    if (await checkForNode()) {
      dispatch(nodeInstalled());
    } else {
      dispatch(nodeNotInstalled());
    }
  };
});

const initialState: NodeCheck = {
  installed: null,
  checkingInstall: false,
};

const nodeCheckSlice = createSlice({
  name: 'nodeCheck',
  initialState: initialState,
  reducers: {
    checkingInstallation: () => {
      return { installed: null, checkingInstall: true };
    },
    nodeInstalled: () => {
      return { installed: true, checkingInstall: false };
    },
    nodeNotInstalled: () => {
      return { installed: false, checkingInstall: false };
    },
  },
});

export const {
  checkingInstallation,
  nodeInstalled,
  nodeNotInstalled,
} = nodeCheckSlice.actions;

export const selectNodeCheckStatus = (state: RootState) => state.nodeCheck;

export default nodeCheckSlice.reducer;
