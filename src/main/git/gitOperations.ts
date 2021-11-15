import axios from 'axios';
import { Octokit } from '@octokit/rest';
import { File, Repository, WEB_PUB_REPO_NAME } from './gitTypes';
import { appendLog } from '../logger';

const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

/**
 * return array of objects with name of repository, author of repository and url to repository
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
 * creates new repository on authorized user account
 * @param accessToken - accessToken
 * @param repoName - name of the repository
 * @param description - description of repository(optional)
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
 * clone repository to given folder
 * @param dir - path to directory
 * @param url - url to repository
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
 * Get list of local branches
 *
 */
export async function getLocalBranches(dir: string) {
  await git.listBranches({ fs, dir }).then((data: any) => appendLog(data));
}

/**
 * Get list of remote branches
 */
export async function getRemoteBranches(dir: string) {
  return git
    .listBranches({ fs, dir, remote: 'origin' })
    .then((data: any) => appendLog(data));
}

/**
 * creates new branch locally
 * @param dir - path to directory with project
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

function checkout(branchDir: string, branchName: string) {
  git
    .checkout({
      fs,
      dir: branchDir,
      ref: branchName,
    })
    .then(() => appendLog(`Successfully checked out to ${branchName}`))
    .catch(() =>
      console.error(`Error occurred while performing checkout to ${branchName}`)
    );
}

/**
 * Adds single file locally
 * @param file - File passed to be added locally
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

// OK Removing file(s)

/**
 * Removes single file locally
 * @param file - File passed to be removed locally
 */
function removeFile(file: File): void {
  git
    .remove({ fs, dir: file.path, filepath: file.filename })
    .then(() => appendLog(`(git add) Ok: ${file.filename}`))
    .catch((error: any) => console.error(`(git add) Error: ${error}`));
}

/**
 * Removes multiple files locally
 * @param files - Array of the files needed to be removed locally.
 */
function removeFiles(files: File[]): void {
  files.forEach((file) => {
    removeFile(file);
  });
}

// OK Commit
/**
 * Performs commit from local repository
 * @param dir - Current working directory (From which command will be executed)
 * @param author - Author of the commit
 * @param message - Message of the commit
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

// OK Push
/**
 * Performs push on remote repository
 * @param dir - Current working directory (From which command will be executed)
 * @param accessToken - Authentication access token
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
  path: string
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
          path,
        })
        .then((data: any) => {
          if (data.status === 200) {
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

export async function addFiles(filePath: string): Promise<void> {
  await searchForFiles(filePath, new Array<File>()).forEach((value) =>
    addFile(value)
  );
}

export function searchForFiles(
  dirPath: string,
  arrayOfFiles: File[],
  dirToRepo: string = dirPath
): File[] {
  if (dirPath.includes('.git')) {
    return arrayOfFiles;
  }

  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file: string) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      arrayOfFiles = searchForFiles(
        `${dirPath}/${file}`,
        arrayOfFiles,
        dirToRepo
      );
    } else {
      const relPath = dirPath.replace(`${dirToRepo}/`, '');
      arrayOfFiles.push({ filename: `${relPath}/${file}`, path: dirToRepo });
    }
  });
  return arrayOfFiles;
}
