/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import fs from 'fs';
import http from 'isomorphic-git/http/node';
import { createLogger } from 'src/main/logger';
import { mainStore as store } from 'src/main';
import {
  LocalPublication,
  Publication,
  PublicationBase,
  USER_ROLES,
} from 'src/shared/types';
import { IpcEventHandler } from 'src/shared/types/api';
import createAuthorFromCollaborators from 'src/shared/utils/createAuthorFromCollaborators';
import createGatsbyProjectGenerator from 'src/main/lib/gatsbyProjectGenerator';
import createConfigFileHandler, {
  Config,
} from 'src/main/lib/configurationFileHandler';
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
import path from 'path';
import git from 'isomorphic-git';
import { AddPublicationWizard } from 'src/shared/redux/slices/addPublicationWizardSlice';
import createGitRepoHandler from 'src/main/lib/gitRepoHandler';
import {
  CONFIG_NAME,
  COVER_PIC_FILENAME,
  GATSBY_CONFIG_NAME,
  MAIN_BRANCH,
  PACKAGE_NAME,
} from '../../../shared/constants';
import createFileIO from '../../lib/fileIO';
import createGitHubHandler from '../../lib/gitHubHandler';

const generate: IpcEventHandler = async (
  _,
  params: AddPublicationWizard['data']
) => {
  const logger = createLogger();

  try {
    const { name, description, collaborators, useTypescript, imagePath } =
      params;
    const author = createAuthorFromCollaborators(collaborators);
    const repoName = name.toLowerCase().replaceAll(' ', '-');
    const { defaultDirPath: dirPath } = store.getState().appSettings;
    const repoPath = path.resolve(dirPath, repoName);

    const projectGenerator = createGatsbyProjectGenerator(params);
    store.dispatch(setStatus(STATUS.GENERATING_GATSBY_PROJECT));
    await projectGenerator.generate(dirPath, repoName);

    let config = params;
    if (imagePath) {
      const destination = path.resolve(
        repoPath,
        `${COVER_PIC_FILENAME}${path.extname(imagePath)}`
      );

      const io = createFileIO();
      await io.copyFile(imagePath, destination);
      config = { ...config, imagePath: destination };
    }

    const configHandler = createConfigFileHandler({ dirPath, name: repoName });
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

    const publication: Publication = {
      ...savedConfig,
      status: 'cloned',
      lastUpdate: savedConfig.creationDate,
      dirPath: repoPath,
      keepDescriptionVisible: false,
      keepSnippetsVisible: false,
      keepServerVisible: false,
    };
    store.dispatch(loadPublication(publication));
    store.dispatch(setActivePublication(savedConfig.id));
    const currentBranchName = await git.currentBranch({ fs, dir: repoPath });
    if (!currentBranchName) {
      throw new Error(`Repo initialization failed - no current branch`);
    }
    if (currentBranchName !== MAIN_BRANCH)
      await git.renameBranch({
        fs,
        dir: repoPath,
        ref: MAIN_BRANCH,
        oldref: currentBranchName,
        checkout: true,
      });
    await commitConfigChanges(savedConfig, repoPath);
    await handleRemoteSetup(savedConfig, repoPath, repoName);
    await checkoutBranch(publication);

    logger.appendLog(`Publication generation successful.`);
    store.dispatch(setStatus(STATUS.SUCCESS));
  } catch (error: any) {
    logger.appendError(`Project generation error failed: ${error.message}`);
    store.dispatch(setStatus(STATUS.FAILURE));
  }
};

export default generate;

async function commitConfigChanges(config: Config, repoPath: string) {
  const username = store.getState().currentUser.data?.nick;
  await Promise.all(
    [
      path.basename(config.imagePath || ''),
      CONFIG_NAME,
      PACKAGE_NAME,
      `config/${GATSBY_CONFIG_NAME}`,
    ].map(
      (filepath) =>
        filepath &&
        git.updateIndex({
          fs,
          dir: repoPath,
          filepath,
          add: true,
        })
    )
  );

  await git.commit({
    fs,
    dir: repoPath,
    message: 'Initial config\n\n[PubLab automatic commit]',
    author: { name: username },
  });
}

async function handleRemoteSetup(
  config: Config,
  repoPath: string,
  repoName: string
) {
  const token = store.getState().currentUser.auth.accessToken?.value;
  const username = store.getState().currentUser.data?.nick;
  if (!username || !token) throw new Error('User not logged in!');

  const repoId = { name: repoName, owner: username };

  const gitHubHandler = createGitHubHandler(token);

  const { data: repoData } = await gitHubHandler.createRepo(repoName);

  await git.addRemote({
    fs,
    dir: repoPath,
    remote: 'origin',
    url: repoData.clone_url,
  });

  await git.push({
    fs,
    http,
    remoteRef: MAIN_BRANCH,
    dir: repoPath,
    onAuth: () => ({ username: token }),
  });
  await gitHubHandler.createBranch('development', repoId);
  await gitHubHandler.updateCollaborators(config.collaborators, repoId);
  await git.fetch({
    fs,
    http,
    dir: repoPath,
    onAuth: () => ({ username: token }),
  });
}

async function checkoutBranch(publication: LocalPublication) {
  const { collaborators, owner } = publication;

  const role = collaborators.find(
    (collaborator) => owner === collaborator.githubUsername
  )?.role;

  const repoHandler = createGitRepoHandler(publication);
  const branch = role === USER_ROLES.EDITOR ? `editor-${owner}` : MAIN_BRANCH;
  await repoHandler.checkout(branch);
}
