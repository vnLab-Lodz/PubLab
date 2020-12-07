const fs = require('fs');
const path = require('path');
const process = require('process');

export function createFoldersInDirectory(projectDirectory : string) : void {
    fs.mkdir(path.join(projectDirectory, 'src'), function () {});
    fs.mkdir(path.join(projectDirectory, 'content'), function () {});

    process.chdir(projectDirectory);
}