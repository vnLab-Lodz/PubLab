var fs = require('fs');
import { isDirectory } from './file-manager';
import { isPublication } from './file-manager';

class Collaborator {
  username: string;
  role: string;
  constructor(username: string, role: string) {
    this.username = username;
    this.role = role;
  }
}

let configFileName = 'vn-pub.conf';

export function createConfigFile(
  path: string,
  name: string,
  description: string,
  collaborators: Collaborator[],
  packageManager: string,
  tag: string
): boolean {
  if (isDirectory(path)) {
    let configContent = {
      name: name,
      description: description,
      collaborators: collaborators,
      package_manager: packageManager,
      tag: tag,
    };
    let configContentJSON = JSON.stringify(configContent);
    fs.writeFileSync(path + '/' + configFileName, configContentJSON);
    return true;
  }
  return false;
}

export function deleteConfigFile(path: string): boolean {
  if (isDirectory(path) && isPublication(path)) {
    try {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path + '/' + configFileName);
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
    let configContentJSON = fs.readFileSync(path + '/' + configFileName);
    let configContent = JSON.parse(configContentJSON);
    configContent.name = newName;
    let newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(path + '/' + configFileName, newConfigContentJSON);
    return true;
  }
  return false;
}

export function modifyDescription(
  path: string,
  newDescription: string
): boolean {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/' + configFileName);
    let configContent = JSON.parse(configContentJSON);
    configContent.description = newDescription;
    let newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(path + '/' + configFileName, newConfigContentJSON);
    return true;
  }
  return false;
}

export function modifyCollaborators(
  path: string,
  newCollaborators: Collaborator[]
): boolean {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/' + configFileName);
    let configContent = JSON.parse(configContentJSON);
    configContent.collaborators = newCollaborators;
    let newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(path + '/' + configFileName, newConfigContentJSON);
    return true;
  }
  return false;
}

export function modifyPackageManager(
  path: string,
  newPackageManager: string
): boolean {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/' + configFileName);
    let configContent = JSON.parse(configContentJSON);
    configContent.packageManager = newPackageManager;
    let newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(path + '/' + configFileName, newConfigContentJSON);
    return true;
  }
  return false;
}

export function modifyTag(path: string, newTag: string): boolean {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/' + configFileName);
    let configContent = JSON.parse(configContentJSON);
    configContent.tag = newTag;
    let newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(path + '/' + configFileName, newConfigContentJSON);
    return true;
  }
  return false;
}

export function getConfigFileJSON(path: string): string {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/' + configFileName);
    let configContent = JSON.parse(configContentJSON);
    return configContent;
  }
  return null;
}
