import {clone, createNewRepository} from "./gitOperations";

const fs = require('fs');
const path = require('path');
const process = require('process');

export function createFoldersInDirectory(projectDirectory : string) : void {
    fs.mkdir(path.join(projectDirectory, 'src'), function () {});
    fs.mkdir(path.join(projectDirectory, 'content'), function () {});
}


export async function createProject(accessToken: string, repoName: string, projectDirectory: string, description?: string) {
    let responseData = await createNewRepository(accessToken, repoName, description);
    process.chdir(projectDirectory);
    createFoldersInDirectory(projectDirectory);
    clone(projectDirectory, responseData.data.clone_url, accessToken)
}