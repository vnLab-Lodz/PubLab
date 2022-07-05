import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GitRepoTreeItem } from '../../types/api';
import { RootState } from '../rootReducer';
import * as repoTree from '../../utils/repoStatus/tree';

interface RepoStatus {
  tree: GitRepoTreeItem | undefined;
}

const initialState: RepoStatus = { tree: undefined };

const repoStatusSlice = createSlice({
  name: 'repoStatus',
  initialState,
  reducers: {
    setStatusTree: (state, action: PayloadAction<RepoStatus['tree']>) => {
      state.tree = action.payload;
    },
    replaceNode: (
      state,
      action: PayloadAction<GitRepoTreeItem | undefined>
    ) => {
      if (!state.tree || !action.payload) return;
      state.tree = repoTree.replaceChildNode(state.tree, action.payload);
    },
  },
});

export const { setStatusTree, replaceNode } = repoStatusSlice.actions;

export const selectRepoTree = (state: RootState) => state.repoStatus.tree;

export default repoStatusSlice.reducer;
