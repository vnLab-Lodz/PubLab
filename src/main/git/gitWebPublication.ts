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

export async function createFoldersInDirectory(projectDirectory : string) : Promise<void> {
    fs.mkdir(path.join(projectDirectory, 'src'), function () {});
    fs.writeFile(projectDirectory +'/src/ReadMeSrc.txt', "This folder should contain code written by a programmer", function () {});

    fs.mkdir(path.join(projectDirectory, 'content'), function () {});
    fs.writeFile(projectDirectory + '/content/ReadMeContent.txt', "This folder should contain code written by a publisher", function () {});
}


export async function createProject(accessToken: string,
                                    repoName: string,
                                    projectDirectory: string,
                                    collaborators : string[],
                                    description?: string) {
    let responseData = await createNewRepository(accessToken, repoName, description)

    init(projectDirectory).then(r => {
        createFoldersInDirectory(projectDirectory).then(r=> {
            addFiles(projectDirectory).then(r => {
                commit(projectDirectory, responseData.data.owner.login, "first commit").then(r => {
                    createBranch(projectDirectory, "master");
                    addRemote(projectDirectory,  "origin", responseData.data.clone_url).then(r=> {
                        push(projectDirectory, accessToken);
                        addCollaborators(accessToken, responseData.data.owner.login, responseData.data.name, collaborators);

                    })
                })
            })
        })
    })



    //TODO: place for adding collaborators in configuration file, collaborators : string[] will have to be changed to the type containing name and role

    //TODO: git add, git commit, git push here <----
}