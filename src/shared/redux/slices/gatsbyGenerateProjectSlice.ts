import { createSlice } from '@reduxjs/toolkit';
import getTemplateUrl from '../../../main/node/getTemplateUrl';
import { generateProject } from '../../../main/node/gatsby';
import { createAsyncActionMain } from '../helpers/createActionMain';
import { Publication } from './loadPublicationsSlice';

type NewProjectPayload = Pick<
  Publication,
  'publicationName' | 'useSass' | 'useTypescript'
>;

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
  ({ publicationName, useSass, useTypescript }) =>
    async (dispatch, getState) => {
      dispatch(creationExecuting());
      try {
        const { defaultDirPath } = getState().appSettings;
        const templateUrl = getTemplateUrl(useSass, useTypescript);

        await generateProject(defaultDirPath, publicationName, templateUrl);
        dispatch(creationFulfilled());
      } catch (error) {
        dispatch(creationRejected());
      }
    }
);

export default gatsbyGenerateProjectSlice.reducer;
