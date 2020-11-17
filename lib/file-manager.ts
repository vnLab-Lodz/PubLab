var fs = require('fs');
var path = require('path');

var currentPath: string = "";

function getCurrentPath(): string {
    return currentPath;
}

function setCurrentPath(newPath: string): void {
    currentPath = newPath;
}

function enterFolder(newFolder: string): void {
    var newPath: string = path.join(getCurrentPath(), newFolder);
    setCurrentPath(newPath);
}

function escapeFolder(currentFolder: string): string {
    var newPath = path.dirname(currentFolder);
    return newPath;
}

function escapeCurrentFolder(): void {
    var newPath: string = path.dirname(currentPath);
    setCurrentPath(newPath);
}

function checkIfRepository(source: string): boolean {
    if(fs.existsSync(path.join(source, ".git"))) {
        return true;
    } else {
        return false;
    }
}

function checkIfPublication(source: string): boolean {
    if(fs.existsSync(path.join(source, "publication_config"))) {
        return true;
    } else {
        return false;
    }
}

function checkIfDirectory(source: string): boolean {
    try {
        if(fs.lstatSync(source).isDirectory()) {
            return true;
        } else {
            return false;
        }
    } catch(error) {
        console.log(error);
        return false;
    }
}

function getDirectories(source: string): string[] {
    var directories: string[] = [];
    try {
        const isDirectory = source => fs.lstatSync(source).isDirectory()
        directories = fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);
    } catch(error) {
        console.log(error);
    }
    return directories;
}

function findAllPublications(path: string): string[] {
    var listOfProjects: string[] = [];
    if(fs.existsSync(path)) {
        if(checkIfDirectory(path)) {
        recursiveSearch(path, listOfProjects);
        }
    } else {
        console.log("There is no such directory or file!");
    }
    return listOfProjects;
}

function recursiveSearch(path: string, listOfProjects: string[]): void {
    if(checkIfPublication(path)) {
        listOfProjects.push(path);
        return;
    } else if(!checkIfRepository(path)) {
        const availableDirectories: string[] = getDirectories(path);
        for(var i = 0; i < availableDirectories.length; i++) {
            recursiveSearch(availableDirectories[i], listOfProjects);
        }
    }
    return;
}

module.exports = {findAllPublications};

