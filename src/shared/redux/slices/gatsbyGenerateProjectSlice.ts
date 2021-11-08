import { createSlice } from '@reduxjs/toolkit';
import { generateProject } from '../../../main/node/gatsby';
import { createAsyncActionMain } from '../helpers/createActionMain';

interface NewProjectPayload {
  projectName: string;
  templateUrl: string;
}

interface GatsbyGenerateProject {
  creating: boolean;
  creationSuccess: boolean | null;
}

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

export const generateNewProject = createAsyncActionMain<NewProjectPayload>(
  'generateProject',
  ({ projectName, templateUrl }) =>
    async (dispatch, getState) => {
      dispatch(creationExecuting());
      try {
        const { defaultDirPath } = getState().appSettings;

        await generateProject(defaultDirPath, projectName, templateUrl);
        dispatch(creationFulfilled());
      } catch (error) {
        dispatch(creationRejected());
      }
    }
);

export default gatsbyGenerateProjectSlice.reducer;
