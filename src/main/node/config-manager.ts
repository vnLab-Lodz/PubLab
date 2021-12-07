import * as fs from 'fs';
import { isDirectory, isPublication } from './file-manager';
import { Collaborator } from '../../shared/redux/slices/loadPublicationsSlice';
import { configFileName } from './config-util';
import { Configuration } from './model/Configuration';

const NODE_PACKAGE_PATH: string = 'package.json';
const GATSBY_CONFIG_TS_PATH: string = 'config/gatsby-config.ts';

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

export function createAuthorFromCollaborators(
  collaborators: Collaborator[] = []
): string {
  return collaborators.reduce(
    (acc, { githubUsername }, index, { length }) =>
      `${acc}${githubUsername}${index !== length - 1 ? ', ' : ''}`,
    ''
  );
}

export function modifyNodePackage(path: string, config: Configuration) {
  const packagePath = `${path}/${NODE_PACKAGE_PATH}`;
  validatePath(
    !isDirectory(path) || !fs.lstatSync(packagePath).isFile(),
    "Couldn't find the package.json file."
  );

  const pckgJson = JSON.parse(fs.readFileSync(packagePath).toString());
  pckgJson.name = config.publicationName;
  pckgJson.description = config.description;

  pckgJson.author = createAuthorFromCollaborators(config.collaborators);
  if (!config.useSass) {
    delete pckgJson.dependencies.sass;
  }
  if (!config.useTypescript) {
    delete pckgJson.devDependencies.typescript;
  }
  fs.writeFileSync(packagePath, JSON.stringify(pckgJson, null, 2));
}

export function modifyGatsbyConfig(path: string, config: Configuration) {
  const configPath = `${path}/${GATSBY_CONFIG_TS_PATH}`;
  validatePath(
    !isDirectory(path) || !fs.lstatSync(configPath).isFile(),
    "Couldn't find the gatsby config file."
  );

  let result = fs.readFileSync(configPath, 'utf8');
  result = result.replace(
    /title: `(.*?)`,/g,
    `title: \`${config.publicationName}\`,`
  );
  result = result.replace(
    /description: `.*?`,/g,
    `description: \`${config.description}\`,`
  );
  result = result.replace(
    /author: `.*?`,/g,
    `author: \`${createAuthorFromCollaborators(config.collaborators)}\`,`
  );

  if (!config.useSass) {
    result = result.replace(/`gatsby-plugin-sass`,/g, '');
  }

  fs.writeFileSync(configPath, result, 'utf8');
}
