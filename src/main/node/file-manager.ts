import * as fs from 'fs';
import path from 'path';
import { v4 as generateUuid } from 'uuid';
import { addPublication } from '../../shared/redux/slices/publicationsSlice';
import { store } from '../store';
import { configFileName } from './config-util';

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
    directories = fs
      .readdirSync(source)
      .map((name) => path.join(source, name))
      .filter(isDirectory);
  } catch (error) {
    console.error(error);
  }
  return directories;
}

function recursiveSearch(source: string): void {
  if (isPublication(source)) {
    try {
      const filePath = path.join(source, configFileName);
      const rawdata = fs.readFileSync(filePath);
      const dataParsed = JSON.parse(rawdata.toString());
      store.dispatch(
        addPublication({
          id: generateUuid(),

          dirPath: source,

          publicationName: dataParsed.confipublicationName,

          description: dataParsed.description,

          collaborators: dataParsed.collaborators,

          packageManager: dataParsed.packageManager,

          useSass: dataParsed.useSass,

          useTypescript: dataParsed.useTypescript,
        })
      );
    } catch (err) {
      console.error(err);
    }
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
