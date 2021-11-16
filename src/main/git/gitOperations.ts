import axios from 'axios';
import { Octokit } from '@octokit/rest';
import { File, Repository, WEB_PUB_REPO_NAME } from './gitTypes';
import { appendLog } from '../logger';

const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

/**
 * return an array of objects with name of each repository, its author and url to it
 * @param accessToken - accessToken
 */
export function getUserRepositories(accessToken: string): Repository[] {
  const repositories: Repository[] = [];
  axios({
    method: 'GET',
    headers: {
      Authorization: `token ${accessToken}`,
    },
    url: 'https://api.github.com/user/repos',
  }).then((data) => {
    appendLog(data.data);
    data.data.forEach((repo: any) => {
      if (repo.name.indexOf(WEB_PUB_REPO_NAME) !== -1) {
        repositories.push({
          name: repo.name,
          author: repo.owner.login,
          url: repo.url,
        } as Repository);
      }
    });
  });
  return repositories;
}

/**
 * creates a new repository on the authorized user account
 * @param accessToken - accessToken
 * @param repoName - name of the repository
 * @param description - description of repository (optional)
 */
export async function createNewRepository(
  accessToken: string,
  repoName: string,
  description?: string
): Promise<any> {
  return axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${accessToken}`,
    },
    url: 'https://api.github.com/user/repos',
    data: {
      name: WEB_PUB_REPO_NAME + repoName,
      description,
      private: true,
      has_issues: true,
      has_projects: true,
      has_wiki: true,
    },
  }).then((data) => data);
}

/**
 * clone repository to the given folder
 * @param dir - path to the directory
 * @param url - url to the repository
 * @param accessToken - access token
 */
export async function clone(
  dir: string,
  url: string,
  accessToken: string
): Promise<void> {
  await git.clone({
    fs,
    http,
    dir,
    corsProxy: 'https://cors.isomorphic-git.org',
    url,
    ref: 'master',
    singleBranch: true,
    depth: 10,
    onAuth: () => ({ username: accessToken }),
  });
}

export async function init(dir: string): Promise<void> {
  await git.init({
    fs,
    dir,
    defaultBranch: 'main',
  });
}

/**
 * Get a list of local branches in the selected dir
 *
 */
export async function getLocalBranches(dir: string) {
  await git.listBranches({ fs, dir }).then((data: any) => appendLog(data));
}

/**
 * Get a list of remote branches in the selected dir
 */
export async function getRemoteBranches(dir: string) {
  return git
    .listBranches({ fs, dir, remote: 'origin' })
    .then((data: any) => appendLog(data));
}

/**
 * creates a new branch locally
 * @param dir - path to the directory with the project
 * @param name - name of the branch
 */
export async function createBranch(dir: string, name: string): Promise<void> {
  await git.branch({ fs, dir, ref: name, checkout: true });
}

export async function pushBranch(dir: string, accessToken: string) {
  await git.push({
    fs,
    http,
    dir,
    onAuth: () => ({ username: accessToken }),
  });
}

/**
 * Adds a single file locally
 * @param file - file passed to be added locally
 */
export async function addFile(file: File): Promise<void> {
  await git
    .add({ fs, dir: file.path, filepath: file.filename })
    .then(() => appendLog(`(git add) Ok: ${file.filename}`))
    .catch((error: any) => console.error(`(git add) Error: ${error}`));
}

export function traverseDir(dir: string): File[] {
  let results: File[] = [];
  fs.readdirSync(dir).forEach((file: any) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      results = results.concat(traverseDir(fullPath));
    } else {
      results.push({ filename: file, path: dir });
    }
  });
  return results;
}

/**
 * Performs the commit from local repository
 * @param dir - current working directory (From which command will be executed)
 * @param author - author of the commit
 * @param message - message of the commit
 */
export async function commit(
  dir: string,
  author: any,
  message: string
): Promise<void> {
  await git
    .commit({
      fs,
      dir,
      author: {
        name: author.login,
      },
      message,
    })
    .then(() => appendLog('(git commit) OK'))
    .catch((error: any) => console.error(`(git commit) Error: ${error}`));
}

/**
 * Performs a push on the remote repository
 * @param dir - current working directory (From which command will be executed)
 * @param accessToken - accessToken
 */
export async function push(dir: string, accessToken: string): Promise<any> {
  await git
    .push({
      fs,
      http,
      dir,
      onAuth: () => ({ username: accessToken }),
    })
    .then(() => appendLog('(git push) OK'))
    .catch((error: any) => console.error(`(git push) Error: ${error}`));
}

/**
 * Adds the single collaborator to the repository (other than its owner)
 * @param accessToken accessToken
 * @param owner owner of the repository
 * @param repo the repository to have the collaborator added
 * @param username username of the collaborator
 */
export function addCollaborator(
  accessToken: string,
  owner: string,
  repo: string,
  username: string
): void {
  const octokit = new Octokit({
    auth: accessToken,
  });
  octokit.repos.addCollaborator({
    owner,
    repo,
    username,
  });
}

/**
 * Adds the single collaborator to the repository (other than its owner)
 * @param accessToken accessToken
 * @param owner owner of the repository
 * @param repo the repository to have the collaborators added
 * @param usernames array of usernames of the collaborators
 */
export async function addCollaborators(
  accessToken: string,
  owner: string,
  repo: string,
  usernames: string[]
): Promise<any> {
  await usernames.forEach((username: string) =>
    addCollaborator(accessToken, owner, repo, username)
  );
}

export function removeCollaborator(
  accessToken: string,
  owner: string,
  repo: string,
  username: string
): void {
  const octokit = new Octokit({
    auth: accessToken,
  });
  octokit.repos.removeCollaborator({
    owner,
    repo,
    username,
  });
}

export async function listCollaborators(
  accessToken: string,
  owner: string,
  repo: string
): Promise<string[]> {
  const octokit = new Octokit({
    auth: accessToken,
  });
  const collaborators: string[] = [];
  octokit.repos
    .listCollaborators({
      owner,
      repo,
    })
    .then((data: any) => {
      data.data.forEach((collaborator: any) => {
        collaborators.push(collaborator.login);
      });
    });
  return collaborators;
}

/**
 * Adds or updates a remote
 * @param dir working tree directory path
 * @param remote name of the remote
 * @param url url of the remote
 */
export async function addRemote(
  dir: string,
  remote: string,
  url: string
): Promise<void> {
  await git
    .addRemote({
      fs,
      dir,
      remote,
      url,
      force: true,
    })
    .then((data: any) => {
      appendLog(data);
    });
}

export async function getPublications(
  accessToken: string,
  dirPath: string
): Promise<string[]> {
  const octokit = new Octokit({
    auth: accessToken,
  });
  let repo: string;
  let owner: string;
  const results: string[] = [];
  await octokit.repos.listForAuthenticatedUser().then((data: any) => {
    data.data.forEach((rep: any) => {
      owner = rep.owner.login;
      repo = rep.name;
      octokit.repos
        .getContent({
          owner,
          repo,
          path: dirPath,
        })
        .then((nextData: any) => {
          if (nextData.status === 200) {
            results.push(rep.name);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
  return results;
}

/**
 * Adds multiple files locally
 * @param filePath - directory path containing the files to be added
 */
export async function addFiles(filePath: string): Promise<void> {
  await searchForFiles(filePath, new Array<File>()).forEach((value) =>
    addFile(value)
  );
}

/**
 * recursively search for files in the given directory path
 * @param dirPath current directory path in the phase of the recursive search
 * @param arrayOfFiles array of the file objects obtained during recursion
 * @param dirToRepo directory path where the search starts constant during recursion
 */
export function searchForFiles(
  dirPath: string,
  arrayOfFiles: File[],
  dirToRepo: string = dirPath
): File[] {
  if (dirPath.includes('.git')) {
    return arrayOfFiles;
  }

  const files = fs.readdirSync(dirPath);
  let currentArrayOfFiles = arrayOfFiles || [];

  files.forEach((file: string) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      currentArrayOfFiles = searchForFiles(
        `${dirPath}/${file}`,
        arrayOfFiles,
        dirToRepo
      );
    } else {
      const relPath = dirPath.replace(`${dirToRepo}/`, '');
      currentArrayOfFiles.push({
        filename: `${relPath}/${file}`,
        path: dirToRepo,
      });
    }
  });
  return currentArrayOfFiles;
}
