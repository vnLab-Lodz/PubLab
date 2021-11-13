import { isDirectory, isPublication } from './file-manager';

const fs = require('fs');

const NODE_PACKAGE_PATH: string = 'package.json';
const GATSBY_CONFIG_TS_PATH: string = 'config/gatsby-config.ts';

// TODO: This should be switched over to definition form #93 -> https://github.com/vnLab-Lodz/PubLab/pull/93
class Collaborator {
  username: string;

  role: string;

  constructor(username: string, role: string) {
    this.username = username;
    this.role = role;
  }
}

// TODO: This should have .json extension to actually be JSON
// TODO: Rename to publab.config.json
const configFileName = 'vn-pub.conf';

// TODO: It would be much better if the function took two args - path and an object with the options
// TODO: The whole return of booleans is a bit weird as well, should probably throw an Error instead
export function createConfigFile(
  path: string,
  name: string,
  description: string,
  collaborators: Collaborator[],
  packageManager: string,
  tag: string
): boolean {
  if (isDirectory(path)) {
    const configContent = {
      name,
      description,
      collaborators,
      packageManager,
      tag,
    };
    const configContentJSON = JSON.stringify(configContent, null, 2);
    fs.writeFileSync(`${path}/${configFileName}`, configContentJSON);
    return true;
  }
  return false;
}

export function deleteConfigFile(path: string): boolean {
  if (isDirectory(path) && isPublication(path)) {
    try {
      if (fs.existsSync(path)) {
        fs.unlinkSync(`${path}/${configFileName}`);
        return true;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  return false;
}

// TODO: Unsure how much sense it makes to have all separate `modify` functions, could probably abstract that
export function modifyName(path: string, newName: string): boolean {
  if (isDirectory(path) && isPublication(path)) {
    const configContentJSON = fs.readFileSync(`${path}/${configFileName}`);
    const configContent = JSON.parse(configContentJSON);
    configContent.name = newName;
    const newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(`${path}/${configFileName}`, newConfigContentJSON);
    return true;
  }
  return false;
}

export function modifyDescription(
  path: string,
  newDescription: string
): boolean {
  if (isDirectory(path) && isPublication(path)) {
    const configContentJSON = fs.readFileSync(`${path}/${configFileName}`);
    const configContent = JSON.parse(configContentJSON);
    configContent.description = newDescription;
    const newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(`${path}/${configFileName}`, newConfigContentJSON);
    return true;
  }
  return false;
}

export function modifyCollaborators(
  path: string,
  newCollaborators: Collaborator[]
): boolean {
  if (isDirectory(path) && isPublication(path)) {
    const configContentJSON = fs.readFileSync(`${path}/${configFileName}`);
    const configContent = JSON.parse(configContentJSON);
    configContent.collaborators = newCollaborators;
    const newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(`${path}/${configFileName}`, newConfigContentJSON);
    return true;
  }
  return false;
}

export function modifyPackageManager(
  path: string,
  newPackageManager: string
): boolean {
  if (isDirectory(path) && isPublication(path)) {
    const configContentJSON = fs.readFileSync(`${path}/${configFileName}`);
    const configContent = JSON.parse(configContentJSON);
    configContent.packageManager = newPackageManager;
    const newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(`${path}/${configFileName}`, newConfigContentJSON);
    return true;
  }
  return false;
}

export function modifyTag(path: string, newTag: string): boolean {
  if (isDirectory(path) && isPublication(path)) {
    const configContentJSON = fs.readFileSync(`${path}/${configFileName}`);
    const configContent = JSON.parse(configContentJSON);
    configContent.tag = newTag;
    const newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(`${path}/${configFileName}`, newConfigContentJSON);
    return true;
  }
  return false;
}

// TODO: the return type should be a variation of Publication from #93 -> https://github.com/vnLab-Lodz/PubLab/pull/93
export function getConfigFileJSON<T = { [key: string]: any }>(path: string): T {
  if (!isDirectory(path) || !isPublication(path)) {
    throw new Error('Config file does not exist. Check the provided path');
  }

  const configContentJSON = fs.readFileSync(`${path}/${configFileName}`);
  return JSON.parse(configContentJSON);
}

export function createAuthorFromCollaborators(
  collaborators: Collaborator[]
): string {
  let result = '';
  for (let i = 0; i < collaborators.length; i++) {
    result += `${collaborators[i].id} ${collaborators[i].role} ${collaborators[i].githubUsername}`;
    if (i !== collaborators.length - 1) {
      result += ', ';
    }
  }
  return result;
}

export function modifyNodePackage(path: string, config: Configuration) {
  const packagePath = `${path}/${NODE_PACKAGE_PATH}`;
  validatePath(
    !isDirectory(path) || !fs.lstatSync(packagePath).isFile(),
    "Couldn't find the package.json file."
  );

  // eslint-disable-next-line import/no-dynamic-require
  const pckgJson = require(packagePath);
  pckgJson.name = config.publicationName;
  pckgJson.description = config.description;

  pckgJson.author = createAuthorFromCollaborators(config.collaborators);
  if (!config.useSass) {
    delete pckgJson.dependencies.sass;
  }
  if (!config.useTypescript) {
    delete pckgJson.devDependencies.typescript;
  }
  fs.writeFileSync(packagePath, JSON.stringify(pckgJson));
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
