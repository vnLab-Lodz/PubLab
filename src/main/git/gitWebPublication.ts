import {clone, createBranch, createNewRepository} from "./gitOperations";

const fs = require('fs');
const path = require('path');
const process = require('process');

export function createFoldersInDirectory(projectDirectory : string) : void {
    fs.mkdir(path.join(projectDirectory, 'src'), function () {});
    fs.mkdir(path.join(projectDirectory, 'content'), function () {});
}


export function createProject(accessToken : string, repoName : string,  projectDirectory : string, description? : string) {
    createNewRepository(accessToken, repoName, description);
    process.chdir(projectDirectory);
    let clone_uri = createFoldersInDirectory(projectDirectory);
    console.log(clone_uri);
}