import { isDirectory, isPublication } from './file-manager';
import { Collaborator } from '../../shared/redux/slices/publicationsSlice';
import { configFileName } from './config-util';
import { Configuration } from './model/Configuration';

const fs = require('fs');

export function createConfigFile(path: string, configuration: Configuration) {
  validatePath(
    !isDirectory(path),
    'Error while creating a config file: directory is not found'
  );
  if (
    !configuration.publicationName ||
    !configuration.packageManager ||
    !configuration.collaborators
  ) {
    throw new Error('Name, package manager and collaborators are required');
  }
  const configContentJSON = JSON.stringify(configuration, null, 2);
  fs.writeFileSync(`${path}/${configFileName}`, configContentJSON);
}

export function deleteConfigFile(path: string) {
  validatePath(!isDirectory(path) || !isPublication(path), 'Invalid path');
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(`${path}/${configFileName}`);
    }
  } catch (err) {
    throw new Error(err.toString());
  }
}

export function updateName(path: string, newName: string) {
  validateNonEmptyNorNull(newName);
  const configurationToUpdate: Configuration = getConfigFile(path);
  updateConfigField(configurationToUpdate, path, () => {
    configurationToUpdate.publicationName = newName;
  });
}

export function updateDescription(path: string, newDescription: string) {
  const configurationToUpdate: Configuration = getConfigFile(path);
  updateConfigField(configurationToUpdate, path, () => {
    configurationToUpdate.description = newDescription;
  });
}

export function updateCollaborators(
  path: string,
  newCollaborators: Collaborator[]
) {
  validateNonEmpty(newCollaborators);
  const configurationToUpdate: Configuration = getConfigFile(path);
  updateConfigField(configurationToUpdate, path, () => {
    configurationToUpdate.collaborators = newCollaborators;
  });
}

export function updatePackageManager(path: string, newPackageManager: string) {
  validateNonEmptyNorNull(newPackageManager);
  const configurationToUpdate: Configuration = getConfigFile(path);
  updateConfigField(configurationToUpdate, path, () => {
    configurationToUpdate.packageManager = newPackageManager;
  });
}

export function updateTag(path: string, tag: string) {
  const configurationToUpdate: Configuration = getConfigFile(path);
  updateConfigField(configurationToUpdate, path, () => {
    configurationToUpdate.tag = tag;
  });
}

export function getConfigFile(path: string): Configuration {
  validatePath(
    !isDirectory(path) || !isPublication(path),
    'Config file does not exist. Check the provided path'
  );
  const configContentJSON = fs.readFileSync(`${path}/${configFileName}`);
  return JSON.parse(configContentJSON) as Configuration;
}

function saveUpdatedConfiguration(path: string, configuration: Configuration) {
  const updatedConfigurationJson = JSON.stringify(configuration);
  deleteConfigFile(path);
  fs.writeFileSync(`${path}/${configFileName}`, updatedConfigurationJson);
}

function validatePath(condition: boolean, errMessage: string) {
  if (condition) {
    throw new Error(errMessage);
  }
}

function validateNonEmptyNorNull(property: string): void {
  if (!property || property.trim().length === 0) {
    throw new Error('This property cannot be null or empty');
  }
}

function validateNonEmpty(arr: any[]) {
  if (!arr || arr.length === 0) {
    throw new Error('Cannot be an empty array');
  }
}

function updateConfigField(
  configurationToUpdate: Configuration,
  path: string,
  setFn: () => void
): void {
  setFn();
  saveUpdatedConfiguration(path, configurationToUpdate as Configuration);
}
