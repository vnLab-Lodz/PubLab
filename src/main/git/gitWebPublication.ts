import {
    addCollaborators,
    clone,
    createBranch,
    createNewRepository,
    commit,
    addFiles,
    push,
    init, addRemote
} from "./gitOperations";

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
    let responseData = await createNewRepository(accessToken, repoName, description)
    createFoldersInDirectory(projectDirectory)
    addCollaborators(accessToken, responseData.data.owner.login, responseData.data.name, collaborators);
    init(projectDirectory).then(r => {
        addFiles(projectDirectory).then(r => {
            commit(projectDirectory, responseData.data.owner.login, "first commit").then(r => {
                createBranch(projectDirectory, "master");
                addRemote(projectDirectory,  "origin", responseData.data.clone_url).then(r=> {
                    push(projectDirectory, accessToken);
                })
            })
        })
    })



    //TODO: place for adding collaborators in configuration file, collaborators : string[] will have to be changed to the type containing name and role

    //TODO: git add, git commit, git push here <----
}