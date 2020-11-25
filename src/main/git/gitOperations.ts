import axios from "axios";
import {Repository} from "./gitTypes";

const git = require('isomorphic-git')
const http = require('isomorphic-git/http/node')
const fs = require('fs')

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
            repositories.push({name: repo.name, author: repo.owner.login, url: repo.url} as Repository)
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
export function createNewRepository(accessToken: string, repoName: string, description?: string):  void{
    axios({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token ' + accessToken
        },
        url: "https://api.github.com/user/repos",
        data: {
            "name": repoName,
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

//Push
//Pull
//Commit