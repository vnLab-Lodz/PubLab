var fs = require('fs');
import isDirectory from './file-manager';
import isPublication from './file-manager';

class Colaborator {
    username: string;
    role: string;
    constructor(username: string, role: string) {
        this.username = username;
        this.role = role;
  }
}

export function createConfigFile(path: string, name: string, description: string, collaborators: Colaborator[], 
                          packageManager: string, tag: string): boolean {
  if (isDirectory(path)) {
    let configContent = { 
      "name": name,
      "description": description,
      "collaborants": collaborators,
      "package_manager": packageManager,
      "tag": tag 
    };
    let configContentJSON = JSON.stringify(configContent);
    fs.writeFileSync(path + '/vn-pub.conf', configContentJSON);
    return true;
  }
  return false;
}

export function deleteConfigFile(path: string): boolean {
  if (isDirectory(path) && isPublication(path)) {
    try {
      if (fs.existsSync(path)) {
        fs.unlinkSync(path + '/vn-pub.conf');
        return true;
      }
    } catch(err) {
      console.error(err);
    }
  return false;
}

export function modifyName(path: string, newName: string): boolean {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/vn-pub.conf');
    let configContent = JSON.parse(configContentJSON);
    configContent.name = newName;
    let newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(path + '/vn-pub.conf', newConfigContentJSON);
    return true;
  }
  return false;
}

export function modifyDescription(path: string, newDescription: string): boolean {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/vn-pub.conf');
    let configContent = JSON.parse(configContentJSON);
    configContent.description = newDescription;
    let newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(path + '/vn-pub.conf', newConfigContentJSON);
    return true;
  }
  return false;
}

export function modifyCollaborants(path: string, newCollaborators: Colaborator[]): boolean {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/vn-pub.conf');
    let configContent = JSON.parse(configContentJSON);
    configContent.collaborators = newCollaborators;
    let newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(path + '/vn-pub.conf', newConfigContentJSON);
    return true;
  }
  return false;
}

export function modifyPackageManager(path: string, newPackageManager: string): boolean {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/vn-pub.conf');
    let configContent = JSON.parse(configContentJSON);
    configContent.packageManager = newPackageManager;
    let newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(path + '/vn-pub.conf', newConfigContentJSON);
    return true;
  }
  return false;
}

export function modifyTag(path: string, newTag: string): boolean {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/vn-pub.conf');
    let configContent = JSON.parse(configContentJSON);
    configContent.tag = newTag;
    let newConfigContentJSON = JSON.stringify(configContent);
    deleteConfigFile(path);
    fs.writeFileSync(path + '/vn-pub.conf', newConfigContentJSON);
    return true;
  }
  return false;
}

export function getName(path: string): string {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/vn-pub.conf');
    let configContent = JSON.parse(configContentJSON);
    return configContent.name;
  }
  return null;
}

export function getDescription(path: string): string {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/vn-pub.conf');
    let configContent = JSON.parse(configContentJSON);
    return configContent.description;
  }
  return null;
}

export function getCollaborants(path: string): Colaborator[] {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/vn-pub.conf');
    let configContent = JSON.parse(configContentJSON);
    return configContent.collaborators;
  }
  return null;
}

export function getPackageManager(path: string): string {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/vn-pub.conf');
    let configContent = JSON.parse(configContentJSON);
    return configContent.packageManager;
  }
  return null;
}

export function getTag(path: string): string {
  if (isDirectory(path) && isPublication(path)) {
    let configContentJSON = fs.readFileSync(path + '/vn-pub.conf');
    let configContent = JSON.parse(configContentJSON);
    return configContent.tag;
  }
  return null;
}