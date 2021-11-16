import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { checkForNode, installNode } from '../../../main/node/node';
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

export const selectNodeCheckStatus = (state: RootState) => state.nodeInstall;

export const installNodeJs = createAsyncActionMain<void>(
  'installNode',
  () => async (dispatch) => {
    dispatch(checkingInstallation());
    const isInstalled = await checkForNode().catch(() =>
      dispatch(nodeNotInstalled())
    );

    if (isInstalled) {
      dispatch(nodeInstalled());
    } else {
      installNode()
        .then(() => {
          dispatch(nodeInstalled());
        })
        .catch(() => {
          dispatch(nodeNotInstalled());
        });
    }
  }
);

export default nodeCheckSlice.reducer;
