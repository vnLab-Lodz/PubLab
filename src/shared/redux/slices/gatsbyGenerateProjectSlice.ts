import { createSlice } from '@reduxjs/toolkit';
import { generateProject } from '../../../main/node/gatsby';
import { createAsyncActionMain } from '../helpers/createActionMain';

export enum TEMPLATE_URLS {
  PAAW_I18N = 'https://github.com/vnLab-Lodz/gatsby-starter-paaw-i18n',
  PAAW_BASIC= 'https://github.com/vnLab-Lodz/gatsby-starter-paaw-basic',
}

function getTemplateUrl(usingSass: boolean, usingTypeScript: boolean) {
  if (usingSass && usingTypeScript) {
    return TEMPLATE_URLS.PAAW_I18N;
  }
  return TEMPLATE_URLS.PAAW_BASIC;
}

interface NewProjectPayload {
  projectName: string;
  publicationNumber: number;
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
  ({ projectName, publicationNumber }) =>
    async (dispatch, getState) => {
      dispatch(creationExecuting());
      try {
        const { defaultDirPath } = getState().appSettings;    
        const { useSass } = getState().publications[publicationNumber];
        const { useTypescript } = getState().publications[publicationNumber];        
        const templateUrl = getTemplateUrl(useSass, useTypescript);

        await generateProject(defaultDirPath, projectName, templateUrl);
        dispatch(creationFulfilled());
      } catch (error) {
        dispatch(creationRejected());
      }
    }
);

export default gatsbyGenerateProjectSlice.reducer;
