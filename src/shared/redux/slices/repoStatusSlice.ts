import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GitRepoTreeItem } from '../../types/api';

type RepoStatus = GitRepoTreeItem | {};

const initialState: RepoStatus = {};

const repoStatusSlice = createSlice({
  name: 'repoStatus',
  initialState,
  reducers: {
    setStatusTree: (_, action: PayloadAction<RepoStatus>) => action.payload,
  },
});

export const { setStatusTree } = repoStatusSlice.actions;

export default repoStatusSlice.reducer;
