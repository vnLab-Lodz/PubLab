import {
  createConfigFile,
  deleteConfigFile,
  getConfigFileJSON,
  updateCollaborators,
  updateDescription,
  updateName,
  updatePackageManager,
  updateTag,
} from './config-manager';
import { Configuration } from './model/Configuration';
import { configFileName } from './config-util';

const fs = require('fs');

const nodeDirectoryPath = './src/main/node';
const invalidDirectoryPath = '&&&*88*.';

const config: Configuration = {
  id: 'id',
  dirPath: 'home',
  publicationName: 'name',
  description: 'description',
  collaborators: [{ id: 'test', role: 'test', githubUsername: 'test' }],
  packageManager: 'npm',
  tag: 'tag',
  useSass: true,
  useTypescript: true,
};

describe('createConfigFile', () => {
  it('create a config file under given directory', () => {
    createConfigFile(nodeDirectoryPath, config);
    expect(() => {
      fs.readFileSync(`${nodeDirectoryPath}/${configFileName}`);
    }).not.toThrow();
  });
});

describe('deleteConfigFile', () => {
  it('the repository is correctly deleted', () => {
    createConfigFile(nodeDirectoryPath, config);
    deleteConfigFile(nodeDirectoryPath);
    expect(() => {
      fs.existsSync(nodeDirectoryPath).toBe(false);
      fs.readFileSync(`${nodeDirectoryPath}/${configFileName}`);
    }).toThrow();
  });
});

describe('deleteConfigFile', () => {
  it('the error is thrown when trying to delete non-existing repository', () => {
    expect(() => {
      deleteConfigFile(nodeDirectoryPath);
    }).toThrow();
  });
});

describe('updateName', () => {
  it('name property in the config is correctly updated, while other fields remain unchanged', () => {
    const updatedName = '08/11/2021 7.8PM';
    const oldConfig = prepareNewConfigFile();
    const updatedConfig = updateConfigField(
      nodeDirectoryPath,
      updatedName,
      updateName
    );
    expect(updatedConfig.publicationName).toEqual(updatedName);
    expect([
      oldConfig.description,
      oldConfig.packageManager,
      oldConfig.collaborators,
    ]).toEqual([
      updatedConfig.description,
      updatedConfig.packageManager,
      updatedConfig.collaborators,
    ]);
  });
});

describe('updateDescription', () => {
  it('description property in the config is correctly updated, while other fields remain unchanged', () => {
    const updatedDescription = '08/11/2021 7.30PM';
    const oldConfig = prepareNewConfigFile();
    const updatedConfig = updateConfigField(
      nodeDirectoryPath,
      updatedDescription,
      updateDescription
    );
    expect(updatedConfig.description).toEqual(updatedDescription);
    expect([
      oldConfig.publicationName,
      oldConfig.packageManager,
      oldConfig.collaborators,
    ]).toEqual([
      updatedConfig.publicationName,
      updatedConfig.packageManager,
      updatedConfig.collaborators,
    ]);
  });
});

describe('updatePackageManager', () => {
  it('packageManager property in the config is correctly updated, while other fields remain unchanged', () => {
    const updatedPackageManager = 'yarn';
    const oldConfig = prepareNewConfigFile();
    const updatedConfig = updateConfigField(
      nodeDirectoryPath,
      updatedPackageManager,
      updatePackageManager
    );
    expect(updatedConfig.packageManager).toEqual(updatedPackageManager);
    expect([
      oldConfig.publicationName,
      oldConfig.description,
      oldConfig.collaborators,
    ]).toEqual([
      updatedConfig.publicationName,
      updatedConfig.description,
      updatedConfig.collaborators,
    ]);
  });
});

describe('updateCollaborators', () => {
  it('collaborators property in the config is correctly updated, while other fields remain unchanged', () => {
    const updatedCollaborators = [
      { id: 'id', role: 'role', githubUsername: 'githubUsername' },
    ];
    const oldConfig = prepareNewConfigFile();
    const updatedConfig = updateConfigField(
      nodeDirectoryPath,
      updatedCollaborators,
      updateCollaborators
    );
    expect(updatedConfig.collaborators).toEqual(updatedCollaborators);
    expect([
      oldConfig.publicationName,
      oldConfig.description,
      oldConfig.packageManager,
    ]).toEqual([
      updatedConfig.publicationName,
      updatedConfig.description,
      updatedConfig.packageManager,
    ]);
  });
});

describe('updateTag', () => {
  it('tag property in the config is correctly updated, while other fields remain unchanged', () => {
    const updatedTag = '08/11/2021 7.37PM';
    const oldConfig = prepareNewConfigFile();
    const updatedConfig = updateConfigField(
      nodeDirectoryPath,
      updatedTag,
      updateTag
    );
    expect(updatedConfig.tag).toEqual(updatedTag);
    expect([
      oldConfig.publicationName,
      oldConfig.description,
      oldConfig.packageManager,
    ]).toEqual([
      updatedConfig.publicationName,
      updatedConfig.description,
      updatedConfig.packageManager,
    ]);
  });
});

describe('updateName', () => {
  it('name property cannot be empty or null', () => {
    expect(() => {
      tryToUpdateWithInvalidParam(nodeDirectoryPath, '', updateName);
    }).toThrowError();
    expect(() => {
      tryToUpdateWithInvalidParam(nodeDirectoryPath, null, updateName);
    }).toThrowError();
  });
});

describe('updatePackageManager', () => {
  it('packageManager property cannot be empty or null', () => {
    expect(() => {
      tryToUpdateWithInvalidParam(nodeDirectoryPath, '', updatePackageManager);
    }).toThrowError();
    expect(() => {
      tryToUpdateWithInvalidParam(
        nodeDirectoryPath,
        null,
        updatePackageManager
      );
    }).toThrowError();
  });
});

describe('updateCollaborators', () => {
  it('collaborators property cannot be empty or null', () => {
    createConfigFile(nodeDirectoryPath, config);
    expect(() => {
      tryToUpdateWithInvalidParam(nodeDirectoryPath, null, updateCollaborators);
    }).toThrowError();
    expect(() => {
      tryToUpdateWithInvalidParam(nodeDirectoryPath, [], updateCollaborators);
    }).toThrowError();
  });
});

describe('createConfigFile', () => {
  it('error is thrown when an invalid directory is passed', () => {
    expect(() => {
      createConfigFile(invalidDirectoryPath, config);
    }).toThrow();
  });
});

describe('deleteConfigFile', () => {
  it('error is thrown when an invalid directory is passed', () => {
    expect(() => {
      deleteConfigFile(invalidDirectoryPath);
    }).toThrow();
  });
});

function prepareNewConfigFile(): Configuration {
  createConfigFile(nodeDirectoryPath, config);
  return getConfigFileJSON(nodeDirectoryPath);
}

function updateConfigField(
  path: string,
  newValue: any,
  updateFn: (path: string, newValue: any) => void
): Configuration {
  updateFn(path, newValue);
  return getConfigFileJSON(path);
}

function tryToUpdateWithInvalidParam(
  path: string,
  param: any,
  updateFn: (path: string, newValue: any) => void
) {
  createConfigFile(nodeDirectoryPath, config);
  updateFn(path, param);
}
