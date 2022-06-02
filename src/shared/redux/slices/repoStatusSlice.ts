import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GitRepoTreeItem } from '../../types/api';
import { RootState } from '../rootReducer';

interface RepoStatus {
  tree: GitRepoTreeItem | undefined;
}

const initialState: RepoStatus = { tree: undefined };

const repoStatusSlice = createSlice({
  name: 'repoStatus',
  initialState,
  reducers: {
    setStatusTree: (state, action: PayloadAction<RepoStatus['tree']>) => ({
      ...state,
      tree: action.payload,
    }),
  },
});

export const { setStatusTree } = repoStatusSlice.actions;

export const selectRepoTree = (state: RootState) => state.repoStatus.tree;

export default repoStatusSlice.reducer;
