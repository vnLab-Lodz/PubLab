import axios, {AxiosResponse} from "axios";
import {Author, BranchNames, Repository, WEB_PUB_REPO_NAME} from "./gitTypes";
import {File} from "./gitTypes";
import {Octokit} from "@octokit/rest";

const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const fs = require('fs')
var path = require('path')
let octokit = new Octokit({
    auth: '2b16c63d908a87d69b8df96b655f693304865cb6',
})

/**
 * return array of objects with name of repository, author of repository and url to repository
 * @param accessToken - accessToken
 */
export function getUserRepositories(accessToken: string): Repository[] {
    const repositories: Repository[] = []
    axios({
        method: 'GET',
        headers: {
            'Authorization': 'token ' + accessToken
        },
        url: "https://api.github.com/user/repos",
    }).then(data => {
        console.log(data)
        data.data.forEach((repo: any) => {
            if (repo.name.indexOf(WEB_PUB_REPO_NAME) !== -1) {
                repositories.push({name: repo.name, author: repo.owner.login, url: repo.url} as Repository)
            }
        })
        console.log(repositories)
    });
    return repositories;
}

/**
 * creates new repository on authorized user account
 * @param accessToken - accessToken
 * @param repoName - name of the repository
 * @param description - description of repository(optional)
 */
export async function createNewRepository(accessToken: string, repoName: string, description?: string): Promise<any> {
    return await axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + accessToken
        },
        url: "https://api.github.com/user/repos",
        data: {
            "name": WEB_PUB_REPO_NAME + repoName,
            "description": description,
            "homepage": "https://github.com",
            "private": true,
            "has_issues": true,
            "has_projects": true,
            "has_wiki": true
        }
    }).then(data => {
        return data;
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
        dir
    })
}


/**
 * Get list of local branches
 *
 */
export async function getLocalBranches(dir: string) {
    return await git.listBranches({fs, dir: dir})
}

/**
 * Get list of remote branches
 */
export async function getRemoteBranches(dir: string) {
    return await git.listBranches({fs, dir: dir, remote: 'origin'})
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
    let pushResult = await git.push({
        fs,
        http,
        dir: dir,
        onAuth: () => ({username: accessToken}),
    })
    console.log(pushResult)
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
function addFile(file: File): void {
    git.add({fs, dir: file.path, filepath: file.filename})
        .then(() => console.log('(git add) Ok: ' + file.filename))
        .catch((error: any) => console.error('(git add) Error: ' + error));
}

function traverseDir(dir: string): File[] {
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

/**
 * Adds multiple files loccaly
 * @param path - Path of the root of the project
 */
export async function addFiles(path: string): Promise<void> {
    traverseDir(path).forEach(file => {
        addFile(file);
    });
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

    console.log(author);
    git.commit({
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
    git.push({
        fs,
        http,
        dir: dir,
        onAuth: () => ({username: accessToken})
    })
        .then(() => console.log('(git push) OK'))
        .catch((error: any) => console.error('(git commit) Error: ' + error));
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
    usernames.forEach((username: string) => addCollaborator(accessToken, owner, repo, username))
}

export function removeCollaborator(owner: string, repo: string, username: string): void {
    octokit.repos.removeCollaborator({
        owner,
        repo,
        username,
    })
}

export async function listCollaborators(owner: string, repo: string): Promise<string[]> {
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
    console.log(collaborators)
    return collaborators;
}

export async function addRemote(dir: string, remote: string, url: string): Promise<void> {
    await git.addRemote({
        fs,
        dir: dir,
        remote: remote,
        url: url
    })
    console.log('done add remote')
}
