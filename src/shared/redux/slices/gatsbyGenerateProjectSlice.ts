import { createSlice } from '@reduxjs/toolkit';
import { generateProject } from '../../../main/node/gatsby';
import { createAsyncActionMain } from '../helpers/createActionMain';

type GatsbyGenerateProject = {
  creating: boolean;
  creationSuccess: boolean | null;
};

const initialState: GatsbyGenerateProject = {
  creating: false,
  creationSuccess: null,
};

const gatsbyGenerateProjectSlice = createSlice({
  name: 'projectGenerate',
  initialState,
  reducers: {
    creationExecuting: () => ({
      creating: true,
      creationSuccess: null,
    }),
    creationFulfilled: () => ({
      creating: false,
      creationSuccess: true,
    }),
    creationRejected: () => ({
      creating: false,
      creationSuccess: false,
    }),
  },
});

export const { creationExecuting, creationFulfilled, creationRejected } =
  gatsbyGenerateProjectSlice.actions;

export const generateNewProject = createAsyncActionMain<string[]>(
  'generateProject',
  (params) => async (dispatch) => {
    dispatch(creationExecuting());
    generateProject(params);
  }
);

export default gatsbyGenerateProjectSlice.reducer;
