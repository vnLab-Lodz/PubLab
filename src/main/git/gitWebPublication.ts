import {
    addCollaborators,
    clone,
    createBranch,
    createNewRepository,
    commit,
    addFiles,
    push,
    init, addRemote, getLocalBranches
} from "./gitOperations";

const fs = require('fs');
const path = require('path');
const process = require('process');

export async function createFoldersInDirectory(projectDirectory : string) : Promise<void> {
    await fs.mkdir(path.join(projectDirectory, 'src'), function () {});
    await fs.writeFile(projectDirectory +'/src/ReadMeSrc.txt', "This folder should contain code written by a programmer", function () {});

    await fs.mkdir(path.join(projectDirectory, 'content'), function () {});
    await fs.writeFile(projectDirectory + '/content/ReadMeContent.txt', "This folder should contain code written by a publisher", function () {});
}

export async function createProject(accessToken: string,
                                    repoName: string,
                                    projectDirectory: string,
                                    collaborators: string[],
                                    description?: string) {

    createNewRepository(accessToken, repoName, description).then(responseData => {

        //After creation of the repository fire sequence of setting up methods
        Promise.resolve()
            .then(function () {
                return  createFoldersInDirectory(projectDirectory);
            })
            .then(function () {
                return addCollaborators(accessToken, responseData.data.owner.login, responseData.data.name, collaborators);
            })
            .then(function () {
                return init(projectDirectory);
            })
            .then(function () {
                return addFiles(projectDirectory);
            })
            .then(function (){
                return commit(projectDirectory, responseData.data.owner, "first commit");
            })
            .then(function () {
                return addRemote(projectDirectory, "origin", responseData.data.clone_url);
            })
            .then(function () {
                return getLocalBranches(projectDirectory);
            })
            .then(function () {
                return push(projectDirectory, accessToken);
            })
            .then(function () {
                return createBranch(projectDirectory, "programmer");
            })
            .then(function () {
                return push(projectDirectory, accessToken);
            })
    })
}
