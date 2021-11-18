import * as fs from 'fs';
import { isDirectory, isPublication } from './file-manager';
import { Collaborator } from '../../shared/redux/slices/publicationsSlice';
import { configFileName } from './config-util';
import { Configuration } from './model/Configuration';

export function createConfigFile(path: string, configuration: Configuration) {
  validatePath(
    !isDirectory(path),
    'Error while creating a config file: directory is not found'
  );
  if (!configuration.publicationName) {
    throw new Error('Name is required');
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
  } catch (err: any) {
    throw new Error(err.toString());
  }
}

export function getConfigFile(path: string): Configuration {
  validatePath(
    !isDirectory(path) || !isPublication(path),
    'Config file does not exist. Check the provided path'
  );
  const configContentJSON = fs.readFileSync(`${path}/${configFileName}`);
  return JSON.parse(configContentJSON.toString()) as Configuration;
}

export function updateConfigField(
  path: string,
  field: keyof Omit<
    Configuration,
    'useTypescript' | 'useSaas' | 'collaborators'
  >,
  value: string
): void;

export function updateConfigField(
  path: string,
  field: keyof Pick<Configuration, 'useTypescript' | 'useSass'>,
  value: boolean
): void;

export function updateConfigField(
  path: string,
  field: keyof Pick<Configuration, 'collaborators'>,
  value: Collaborator[]
): void;

export function updateConfigField(path: string, field: any, value: any) {
  if (field === 'publicationName') validateNonEmptyNorNull(value);

  const oldConfiguration = getConfigFile(path);
  const updatedConfiguration = { ...oldConfiguration, [field]: value };

  fs.writeFileSync(
    `${path}/${configFileName}`,
    JSON.stringify(updatedConfiguration, null, 2)
  );
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
