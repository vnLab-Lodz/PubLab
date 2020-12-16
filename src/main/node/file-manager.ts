import fs from 'fs';
import path from 'path';
import { addPublication } from '../../shared/slices/publicationsSlice';

let configFileName = 'vn-pub.conf';

function isRepository(source: string): boolean {
  return fs.existsSync(path.join(source, '.git'));
}

/**
 * Checks if given path is a publication. Returns true if there is a config file in the directory.
 * @param {string} source
 * @return {boolean}
 */
export function isPublication(source: string): boolean {
  return fs.existsSync(path.join(source, configFileName));
}

/**
 * Checks if given path is a directory
 * @param {string} source
 * @return {boolean}
 */
export function isDirectory(source: string): boolean {
  try {
    return fs.lstatSync(source).isDirectory();
  } catch (error) {
    return false;
  }
}

function getDirectories(source: string): string[] {
  let directories: string[] = [];
  try {
    const isDirectory = (source: string) => fs.lstatSync(source).isDirectory();
    directories = fs
      .readdirSync(source)
      .map((name) => path.join(source, name))
      .filter(isDirectory);
  } catch (error) {}
  return directories;
}

function recursiveSearch(source: string): void {
  if (isPublication(source)) {
    try {
      let filePath = path.join(source, configFileName);
      let rawdata = fs.readFileSync(filePath);
      let dataParsed = JSON.parse(rawdata.toString());
      addPublication({
        project_name: dataParsed.project_name,
        collaborators: dataParsed.collaborators,
        pm_preference: dataParsed.collaborators,
        description: dataParsed.description,
        dirPath: source,
      });
    } catch (err) {}
  } else if (!isRepository(source)) {
    const availableDirectories: string[] = getDirectories(source);
    for (let i = 0; i < availableDirectories.length; i++) {
      recursiveSearch(availableDirectories[i]);
    }
  }
}

/**
 * Finds all publication config files and uploads their content to the application state.
 * Rejects the promise if a command execution error occurs.
 * @param {string} source
 * @return {Promise<boolean>}
 */
export function findLocalPublications(source: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      if (fs.existsSync(source) && isDirectory(source)) {
        recursiveSearch(source);
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
}
