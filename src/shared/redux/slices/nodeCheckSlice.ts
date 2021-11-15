import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { checkForNode } from '../../../main/node/nodeCheck';
import { createAsyncActionMain } from '../helpers/createActionMain';

type NodeCheck = {
  installed: boolean | null;
  checkingInstall: boolean;
};

const initialState: NodeCheck = {
  installed: null,
  checkingInstall: false,
};

const nodeCheckSlice = createSlice({
  name: 'nodeCheck',
  initialState,
  reducers: {
    checkingInstallation: () => ({ installed: null, checkingInstall: true }),
    nodeInstalled: () => ({ installed: true, checkingInstall: false }),
    nodeNotInstalled: () => ({ installed: false, checkingInstall: false }),
  },
});

export const { checkingInstallation, nodeInstalled, nodeNotInstalled } =
  nodeCheckSlice.actions;

export const selectNodeCheckStatus = (state: RootState) => state.nodeCheck;

export const checkNode = createAsyncActionMain<void>(
  'checkForNode',
  () => async (dispatch) => {
    dispatch(checkingInstallation());
    if (await checkForNode()) {
      dispatch(nodeInstalled());
    } else {
      dispatch(nodeNotInstalled());
    }
  }
);

export default nodeCheckSlice.reducer;
