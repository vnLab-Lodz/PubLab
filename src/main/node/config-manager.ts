import { isDirectory, isPublication } from './file-manager';

const fs = require('fs');

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
