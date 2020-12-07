import {addCollaborators, clone, createNewRepository} from "./gitOperations";

const fs = require('fs');
const path = require('path');
const process = require('process');

export function createFoldersInDirectory(projectDirectory : string) : void {
    fs.mkdir(path.join(projectDirectory, 'src'), function () {});
    fs.mkdir(path.join(projectDirectory, 'content'), function () {});
}


export async function createProject(accessToken: string,
                                    repoName: string,
                                    projectDirectory: string,
                                    collaborators : string[],
                                    description?: string) {
    let responseData = await createNewRepository(accessToken, repoName, description);
    addCollaborators(accessToken, responseData.data.owner.login, responseData.data.name, collaborators);
    //TODO: place for adding collaborators in configuration file, collaborators : string[] will have to be changed to the type containing name and role
    createFoldersInDirectory(projectDirectory);
    clone(projectDirectory, responseData.data.clone_url, accessToken)
    //TODO: git add, git commit, git push here <----
}