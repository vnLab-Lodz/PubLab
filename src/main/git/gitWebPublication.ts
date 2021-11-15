import {
  addCollaborators,
  createBranch,
  createNewRepository,
  commit,
  addFiles,
  push,
  init,
  addRemote,
  getLocalBranches,
} from './gitOperations';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

/**
 * Create basic project folders in given directory
 * @param projectDirectory - local project directory
 */

export async function createFoldersInDirectory(
  projectDirectory: string
): Promise<void> {
  await mkdirp(projectDirectory);
  await fs.mkdir(path.join(projectDirectory, 'src'), () => {});
  await fs.writeFile(
    `${projectDirectory}/src/ReadMeSrc.txt`,
    'This folder should contain code written by a programmer',
    () => {}
  );
  await fs.mkdir(path.join(projectDirectory, 'content'), () => {});
  await fs.writeFile(
    `${projectDirectory}/content/ReadMeContent.txt`,
    'This folder should contain code written by a publisher',
    () => {}
  );
}

/**
 * Function to create new project. Creates folders in given directory, creates repository on github, add collaborators on new github repository,
 * push local changes to new github repository
 * @param accessToken - access token
 * @param repoName - name of the repository on Github
 * @param projectDirectory - local project directory
 * @param collaborators - list of collaborators (usernames on github)
 * @param description - description of github repository
 */
export async function createProject(
  accessToken: string,
  repoName: string,
  projectDirectory: string,
  collaborators: string[],
  description?: string
) {
  createNewRepository(accessToken, repoName, description).then(
    (responseData) => {
      // After creation of the repository fire sequence of setting up methods
      Promise.resolve()
        .then(() => createFoldersInDirectory(projectDirectory))
        .then(() =>
          addCollaborators(
            accessToken,
            responseData.data.owner.login,
            responseData.data.name,
            collaborators
          )
        )
        .then(() => init(projectDirectory))
        .then(() => addFiles(projectDirectory))
        .then(() =>
          commit(projectDirectory, responseData.data.owner, 'The first commit')
        )
        .then(() =>
          addRemote(projectDirectory, 'origin', responseData.data.clone_url)
        )
        .then(() => getLocalBranches(projectDirectory))
        .then(() => push(projectDirectory, accessToken))
        .then(() => createBranch(projectDirectory, 'content'))
        .then(() => push(projectDirectory, accessToken));
    }
  );
}
