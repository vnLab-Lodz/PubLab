import * as fs from 'fs';
import * as path from 'path';
import { createAsyncActionMain } from '../helpers/createActionMain';
import { configFileName } from '../../../main/node/config-util';

type Collaborator = {
  id: string;
  githubUsername: string;
  role: string;
  /* avatar: {
    src: string;
    alt: string;
  }; */
};

type Publication = {
  id: string;
  dirPath: string;
  publicationName: string;
  description: string;
  collaborators: Collaborator[];
  packageManager: string;
  useSass: boolean;
  useTypescript: boolean;
};

export const createConfigurationFile = createAsyncActionMain<
  Omit<Publication, 'dirPath'>
>('createConfigurationFile', (configuration) => async (_, getState) => {
  try {
    console.log('WHATH THTE HEHSAHDS');

    const { defaultDirPath } = getState().appSettings;
    const dirPath = path.join(
      defaultDirPath,
      configuration.publicationName,
      configFileName
    );
    const config = { ...configuration, dirPath, tag: 'fake_tag' }; // TODO: refactor the usage of tag
    const configContentJSON = JSON.stringify(config, null, 2);
    fs.writeFileSync(dirPath, configContentJSON);
  } catch (error) {
    console.error(error);
  }
});
