/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createLogger } from 'src/main/logger';
import { mainStore as store } from 'src/main';
import { PublicationBase } from 'src/shared/types';
import { IpcEventHandler } from 'src/shared/types/api';
import createAuthorFromCollaborators from 'src/shared/utils/createAuthorFromCollaborators';
import createGatsbyProjectGenerator from 'src/main/lib/gatsbyProjectGenerator';
import createConfigFileHandler from 'src/main/lib/configurationFileHandler';
import createPackageHandler from 'src/main/lib/packageHandler';
import createGatsbyConfigHandler from 'src/main/lib/gatsbyConfigHandler';
import {
  setStatus,
  PUBLICATION_GENERATION_STATUS as STATUS,
} from 'src/shared/redux/slices/publicationGenerationSlice';
import {
  loadPublication,
  setActivePublication,
} from 'src/shared/redux/slices/loadPublicationsSlice';

const generate: IpcEventHandler = async (_, params: PublicationBase) => {
  const logger = createLogger();

  try {
    const { name, description, collaborators, useTypescript } = params;
    const author = createAuthorFromCollaborators(collaborators);
    const repoName = name.toLowerCase().replaceAll(' ', '-');
    const { defaultDirPath: dirPath } = store.getState().appSettings;

    const projectGenerator = createGatsbyProjectGenerator(params);
    store.dispatch(setStatus(STATUS.GENERATING_GATSBY_PROJECT));
    await projectGenerator.generate(dirPath, repoName);

    const configHandler = createConfigFileHandler({ dirPath, name: repoName });
    const { imagePath, ...config } = params;
    store.dispatch(setStatus(STATUS.CREATING_CONFIGURATION_FILE));
    const savedConfig = await configHandler.createConfigFile(config);

    const packageHandler = createPackageHandler({ dirPath, name: repoName });
    store.dispatch(setStatus(STATUS.MODIFYING_PACKAGE_JSON));
    await packageHandler.modifyPackage((packageJSON) => {
      packageJSON.name = repoName;
      packageJSON.author = author;
      packageJSON.description = description;
    });

    const options = { dirPath, usesTypescript: useTypescript, name: repoName };
    const gatsbyConfigHandler = createGatsbyConfigHandler(options);
    store.dispatch(setStatus(STATUS.MODIFYING_GATSBY_CONFIG));
    await gatsbyConfigHandler.modifyConfig((data) =>
      data
        .replace(/title: `(.*?)`,/g, `title: \`${name}\`,`)
        .replace(/author: `.*?`,/g, `author: \`${author}\`,`)
        .replace(/description: `.*?`,/g, `description: \`${description}\`,`)
    );

    store.dispatch(
      loadPublication({
        ...savedConfig,
        status: 'cloned',
        lastUpdate: savedConfig.creationDate,
      })
    );
    store.dispatch(setActivePublication(savedConfig.id));

    logger.appendLog(`Publication generation successful.`);
    store.dispatch(setStatus(STATUS.SUCCESS));
  } catch (error: any) {
    logger.appendError(`Project generation error failed: ${error.message}`);
    store.dispatch(setStatus(STATUS.FAILURE));
  }
};

export default generate;
