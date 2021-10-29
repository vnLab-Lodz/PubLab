import { isDirectory, isPublication } from './file-manager';

const fs = require('fs');

class Collaborator {
  username: string;

  role: string;

  constructor(username: string, role: string) {
    this.username = username;
    this.role = role;
  }
}

const configFileName = 'vn-pub.conf';

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
      packageManager: packageManager,
      tag,
    };
    const configContentJSON = JSON.stringify(configContent);
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

export function getConfigFileJSON(path: string): string {
  if (isDirectory(path) && isPublication(path)) {
    const configContentJSON = fs.readFileSync(`${path}/${configFileName}`);
    const configContent = JSON.parse(configContentJSON);
    return configContent;
  }
  return null;
}
