import axios from "axios";
import {Author, BranchNames, Repository, WEB_PUB_REPO_NAME} from "./gitTypes";
import {File} from "./gitTypes";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {NoParamCallback} from "fs";

const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const fs = require('fs')

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
export function createNewRepository(accessToken: string, repoName: string, description?: string): void {
    axios({
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
        console.log(data);
    });
}

/**
 * clone repository to given folder
 * @param dir - path to directory
 * @param url - url to repository
 */
export function clone(dir: string, url: string): void {
    git.clone({
        fs,
        http,
        dir,
        corsProxy: 'https://cors.isomorphic-git.org',
        url,
        ref: 'master',
        singleBranch: true,
        depth: 10
    });
}

/**
 * creates new branch
 * @param dir - path to directory with project
 * @param name - name of the branch
 */
export function createBranch(dir: string, name: string): void {
    git.branch({
        fs,
        dir,
        corsProxy: 'https://cors.isomorphic-git.org',
        ref: name
    })

    // git push origin <branch-name>
    //push(dir, name)
}

/**
 *
 * @param accessToken
 * @param repoName
 * @param dir
 * @param description
 */
export function createNewProject(accessToken: string, repoName: string, dir: string, description?: string): void {
    createNewRepository(accessToken, repoName, description)
    createBranch(dir, BranchNames.PROGRAMISTA)
    createBranch(dir, BranchNames.REDAKTOR_MAIN)
    createBranch(dir, BranchNames.REDAKTOR_SLAVE + "1")
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
        .then(() => console.log('(git remove) Ok: ' + file.filename))
        .catch((error: any) => console.error('(git remove) Error: ' + error));
}

/**
 * Adds multiple files loccally
 * @param files - Array of the files needed to be added locally.
 */
function addFiles(files: File[]): void {
    files.forEach(file => {
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
function commit(dir: string, author: Author, message: string): void {
    git.commit({
        fs,
        dir: dir,
        author: {
            name: author.name,
            email: author.email,
        },
        message: message
    })
        .then(() => console.log('(git commit) OK'))
        .catch((error: any) => console.error('(git commit) Error: ' + error));
}

//OK Push
/**
 * Performs push pn remote repository
 * @param dir - Current working directory (From which command will be executed)
 * @param accessToken - Authentication access token
 */
function push(dir: string, accessToken: string): void {
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

