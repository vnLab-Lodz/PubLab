import fs from 'fs';
import path from 'path';
import { useSelector } from 'react-redux';
import { selectDefaultDirPath } from '../../shared/slices/configurationSlice';

function isRepository(source: string): boolean {
  if (fs.existsSync(path.join(source, '.git'))) {
    return true;
  } else {
    return false;
  }
}

function isPublication(source: string): boolean {
  if (fs.existsSync(path.join(source, 'publication_config'))) {
    return true;
  } else {
    return false;
  }
}

function isDirectory(source: string): boolean {
  try {
    if (fs.lstatSync(source).isDirectory()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

function getDirectories(source: string): string[] {
  var directories: string[] = [];
  try {
    const isDirectory = (source: string) => fs.lstatSync(source).isDirectory();
    directories = fs
      .readdirSync(source)
      .map((name) => path.join(source, name))
      .filter(isDirectory);
  } catch (error) {
    console.log(error);
  }
  return directories;
}

function recursiveSearch(path: string, listOfProjects: string[]): void {
  if (isPublication(path)) {
    listOfProjects.push(path);
  } else if (!isRepository(path)) {
    const availableDirectories: string[] = getDirectories(path);
    for (var i = 0; i < availableDirectories.length; i++) {
      recursiveSearch(availableDirectories[i], listOfProjects);
    }
  }
}

function findLocalPublications(): string[] {
  const path = useSelector(selectDefaultDirPath);

  var listOfProjects: string[] = [];
  if (fs.existsSync(path)) {
    if (isDirectory(path)) {
      recursiveSearch(path, listOfProjects);
    }
  } else {
    console.log('There is no such directory or file!');
  }
  return listOfProjects;
}

export default findLocalPublications;
