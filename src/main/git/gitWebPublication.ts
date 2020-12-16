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
    fs.mkdir(path.join(projectDirectory, 'src'), function () {});
    fs.writeFile(projectDirectory +'/src/ReadMeSrc.txt', "This folder should contain code written by a programmer", function () {});

    fs.mkdir(path.join(projectDirectory, 'content'), function () {});
    fs.writeFile(projectDirectory + '/content/ReadMeContent.txt', "This folder should contain code written by a publisher", function () {});
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
                console.log(1);
                return createFoldersInDirectory(projectDirectory);
            })
            .then(function () {
                console.log(2);
                return addCollaborators(accessToken, responseData.data.owner.login, responseData.data.name, collaborators);
            })
            .then(function () {
                console.log(3);
                return init(projectDirectory);
            })
            .then(function () {
                console.log(4);
                return addFiles(projectDirectory);
            })
            .then(function (){
                console.log(5);
                return commit(projectDirectory, responseData.data.owner, "first commit");
            })
            .then(function () {
                console.log(6);
                return createBranch(projectDirectory,  "main");
            })
            .then(function () {
                console.log(7);
                return addRemote(projectDirectory, "origin", responseData.data.clone_url);
            })
            .then(function () {
                return getLocalBranches(projectDirectory);
            })
            .then(function () {
                console.log(8);
                return push(projectDirectory, accessToken);
            })
    })
    //TODO: place for adding collaborators in configuration file, collaborators : string[] will have to be changed to the type containing name and role
    //TODO: git add, git commit, git push here <----
}
