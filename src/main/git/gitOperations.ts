import axios from "axios";
import {File} from "./gitTypes";
import {Octokit} from "@octokit/rest";

const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const fs = require('fs')
let path = require('path')


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
    return await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'token ' + accessToken,
    },
    url: 'https://api.github.com/user/repos',
    data: {
      name: repoName,
      description: description,
      homepage: 'https://github.com',
      private: true,
      has_issues: true,
      has_projects: true,
      has_wiki: true,
    },
  }).then((data) => {
      return data
  });
}

/**
 * clone repository to given folder
 * @param dir - path to directory
 * @param url - url to repository
 * @param accessToken - access token
 */
export async function clone(dir: string, url: string, accessToken: string): Promise<void> {
    await git.clone({
        fs,
        http,
        dir,
        corsProxy: 'https://cors.isomorphic-git.org',
        url,
        ref: 'master',
        singleBranch: true,
        depth: 10,
        onAuth: () => ({username: accessToken})
    });
}

export async function init(dir: string): Promise<void> {
    await git.init({
        fs,
        dir,
        defaultBranch: 'redaktor'
    })
}


/**
 * Get list of local branches
 *
 */
export async function getLocalBranches(dir: string) {
    await git.listBranches({fs, dir: dir})
        .then((data : any) => console.log(data));
}

/**
 * Get list of remote branches
 */
export async function getRemoteBranches(dir: string) {
    return await git.listBranches({fs, dir: dir, remote: 'origin'})
        .then((data : any) => console.log(data));
}

/**
 * creates new branch locally
 * @param dir - path to directory with project
 * @param name - name of the branch
 */
export async function createBranch(dir: string, name: string): Promise<void> {
    await git.branch({fs, dir: dir, ref: name, checkout: true})
}

export async function pushBranch(dir: string, accessToken: string) {
    await git.push({
        fs,
        http,
        dir: dir,
        onAuth: () => ({username: accessToken}),
    })
}


//Checkout

function checkout(branchDir: string, branchName: string) {
    git.checkout({
        fs,
        dir: branchDir,
        ref: branchName
    })
        .then(() => console.log('Successfully checked out to ' + branchName))
        .catch(() => console.log('Error occurred while performing checkout to ' + branchName));
}

//OK Adding file(s)

/**
 * Adds single file locally
 * @param file - File passed to be added locally
 */
export async function addFile(file: File): Promise<void> {
    await git.add({fs, dir: file.path, filepath: file.filename})
        .then(() => console.log('(git add) Ok: ' + file.filename))
        .catch((error: any) => console.error('(git add) Error: ' + error));
}

export function traverseDir(dir: string): File[] {
    let results: File[] = []
    fs.readdirSync(dir).forEach((file: any) => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            results = results.concat(traverseDir(fullPath));
        } else {
            results.push({filename: file, path: dir});
        }
    });
    return results
}

//OK Removing file(s)

/**
 * Removes single file locally
 * @param file - File passed to be removed locally
 */
function removeFile(file: File): void {
    git.remove({fs, dir: file.path, filepath: file.filename})
        .then(() => console.log('(git add) Ok: ' + file.filename))
        .catch((error: any) => console.error('(git add) Error: ' + error));
}

/**
 * Removes multiple files locally
 * @param files - Array of the files needed to be removed locally.
 */
function removeFiles(files: File[]): void {
    files.forEach(file => {
        removeFile(file);
    });
}

//OK Commit
/**
 * Performs commit from local repository
 * @param dir - Current working directory (From which command will be executed)
 * @param author - Author of the commit
 * @param message - Message of the commit
 */
export async function commit(dir: string, author: any, message: string): Promise<void> {
    await git.commit({
        fs,
        dir: dir,
        author: {
            name: author.login
        },
        message: message
    })
        .then(() => console.log('(git commit) OK'))
        .catch((error: any) => console.error('(git commit) Error: ' + error));
}

//OK Push
/**
 * Performs push on remote repository
 * @param dir - Current working directory (From which command will be executed)
 * @param accessToken - Authentication access token
 */
export async function push(dir: string, accessToken: string): Promise<any> {
   await git.push({
        fs,
        http,
        dir: dir,
        onAuth: () => ({username: accessToken})
    })
        .then(() => console.log('(git push) OK'))
        .catch((error: any) => console.error('(git push) Error: ' + error));
}


export function publish(): void {
    const token = '';
    const file = {filename: 'test.txt', path: 'C:\\Users\\anton\\Desktop'};
    addFile(file);
    commit("C:\\Users\\anton\\Desktop", {name: 'Mr. Test', email: 'email@email.com'}, 'good evening');
    push("C:\\Users\\anton\\Desktop", token);
}

export function addCollaborator(accessToken: string, owner: string, repo: string, username: string): void {
    let octokit = new Octokit({
        auth: accessToken
    })
    octokit.repos.addCollaborator({
        owner,
        repo,
        username,
    });
}

export async function addCollaborators(accessToken: string, owner: string, repo: string, usernames: string[]): Promise<any> {
    await usernames.forEach((username: string) => addCollaborator(accessToken, owner, repo, username))
}

export function removeCollaborator(accessToken: string, owner: string, repo: string, username: string): void {
    let octokit = new Octokit({
        auth: accessToken
    })
    octokit.repos.removeCollaborator({
        owner,
        repo,
        username,
    })
}

export async function listCollaborators(accessToken: string, owner: string, repo: string): Promise<string[]> {
    let octokit = new Octokit({
        auth: accessToken
    })
    const collaborators: string[] = [];
    octokit.repos.listCollaborators({
        owner,
        repo,
    })
        .then((data: any) => {
            data.data.forEach((collaborator: any) => {
                collaborators.push(collaborator.login)
            })
        })
    return collaborators;
}

export async function addRemote(dir: string, remote: string, url: string): Promise<void> {
    await git.addRemote({
        fs,
        dir: dir,
        remote: remote,
        url: url
    }).then((data: any) => {
        console.log(data);
    });
}

export async function getPublications(accessToken: string, path: string): Promise<string[]> {
    let octokit = new Octokit({
        auth: accessToken
    })
    let repo: string;
    let owner: string;
    const results: string[] = [];
    await octokit.repos.listForAuthenticatedUser().then((data: any) => {
        data.data.forEach((rep: any) => {
            owner = rep.owner.login
            repo = rep.name
            octokit.repos.getContent({
                owner,
                repo,
                path,
            }).then((data: any) => {
                if (data.status == 200) {
                    results.push(rep.name)
                }
            }).catch((error) => {
                console.log(error)
            })
        })
    })
    return results;
}


export async function addFiles(path: string): Promise<void> {
    await searchForFiles(path, new Array<File>()).forEach((value) => addFile(value));
}

export function searchForFiles(dirPath: string, arrayOfFiles: File[], dirToRepo: string = dirPath): File[] {
    if (dirPath.includes('.git')) {
        return arrayOfFiles;
    }

    let files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file: string) {
        if (fs.statSync(dirPath + '/' + file).isDirectory()) {
            arrayOfFiles = searchForFiles(dirPath + '/' + file, arrayOfFiles, dirToRepo);
        } else {
            // let newPath = dirPath.replace(new RegExp('/', 'g'), '\u005C');
            let relPath = dirPath.replace(dirToRepo + '/', '');
            arrayOfFiles.push({filename: relPath + '/' + file, path: dirToRepo});
        }
    })
    return arrayOfFiles;
}
