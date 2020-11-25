import axios from "axios";
import {BranchNames, Repository, WEB_PUB_REPO_NAME} from "./gitTypes";
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
            if(repo.name.indexOf(WEB_PUB_REPO_NAME) !== -1) {
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

    //TODO to tworzy branch lokalnie, teraz trzeba zrobić "git push origin <nazwa-brancha>"
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