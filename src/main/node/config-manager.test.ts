import {
  createConfigFile,
  deleteConfigFile,
  getConfigFile,
  updateConfigField,
} from './config-manager';
import { Configuration } from './model/Configuration';
import { configFileName } from './config-util';

const fs = require('fs');

const nodeDirectoryPath = './src/main/node';
const invalidDirectoryPath = '&&&*88*.';
const configFilePath = `${nodeDirectoryPath}/${configFileName}`;

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

const invalidConfig: Configuration = {
  id: '',
  dirPath: '',
  publicationName: '',
  description: '',
  collaborators: [],
  packageManager: '',
  tag: '',
  useSass: true,
  useTypescript: true,
};

describe('createConfigFile', () => {
  beforeEach(() => {
    if (fs.existsSync(configFilePath)) {
      fs.unlinkSync(configFilePath);
    }
  });
  it('creates a config file under given directory', () => {
    createConfigFile(nodeDirectoryPath, config);
    expect(() => {
      fs.readFileSync(configFilePath);
    }).not.toThrow();
  });
  it('throws an error when trying to create a config with empty name', () => {
    expect(() => {
      createConfigFile(nodeDirectoryPath, invalidConfig);
    }).toThrow();
  });
  it('throws an error when an invalid directory is passed', () => {
    expect(() => {
      createConfigFile(invalidDirectoryPath, config);
    }).toThrow();
  });
});

describe('deleteConfigFile', () => {
  beforeEach(() => {
    createConfigFile(nodeDirectoryPath, config);
  });
  it('deletes the config file correctly if it exists', () => {
    deleteConfigFile(nodeDirectoryPath);
    expect(() => {
      fs.readFileSync(configFilePath);
    }).toThrow();
  });
  it('throws an error when trying to delete a non-existing config', () => {
    deleteConfigFile(nodeDirectoryPath);
    expect(() => {
      deleteConfigFile(nodeDirectoryPath);
    }).toThrow();
  });
  it('throws an error when invalid directory is passed', () => {
    expect(() => {
      deleteConfigFile(invalidDirectoryPath);
    }).toThrow();
  });
});

describe('updateConfigField', () => {
  beforeEach(() => createConfigFile(nodeDirectoryPath, config));
  it('correctly updates the publicationName', () => {
    const name = 'new name';
    updateConfigField(nodeDirectoryPath, 'publicationName', name);
    expect(getConfigFile(nodeDirectoryPath).publicationName).toBe(name);
  });
  it('correctly validates input for publicationNameField', () => {
    expect(() => {
      updateConfigField(nodeDirectoryPath, 'publicationName', '');
    }).toThrow();
  });
  it('correctly updates the description', () => {
    const description = 'new description';
    updateConfigField(nodeDirectoryPath, 'description', description);
    expect(getConfigFile(nodeDirectoryPath).description).toBe(description);
  });
  it('correctly updates the tag', () => {
    const tag = 'new tag';
    updateConfigField(nodeDirectoryPath, 'tag', tag);
    expect(getConfigFile(nodeDirectoryPath).tag).toBe(tag);
  });
  it('correctly updates the packageManager', () => {
    const packageManager = 'yarn';
    updateConfigField(nodeDirectoryPath, 'packageManager', packageManager);
    expect(getConfigFile(nodeDirectoryPath).packageManager).toBe(
      packageManager
    );
  });
  it('correctly updates the dirPath', () => {
    const dirPath = '/core';
    updateConfigField(nodeDirectoryPath, 'dirPath', dirPath);
    expect(getConfigFile(nodeDirectoryPath).dirPath).toBe(dirPath);
  });
  it('correctly updates the useSaas', () => {
    updateConfigField(nodeDirectoryPath, 'useSass', false);
    expect(getConfigFile(nodeDirectoryPath).useSass).toBe(false);
  });
  it('correctly updates the useTypescript', () => {
    updateConfigField(nodeDirectoryPath, 'useTypescript', false);
    expect(getConfigFile(nodeDirectoryPath).useTypescript).toBe(false);
  });
  it('correctly updates the useSaas', () => {
    updateConfigField(nodeDirectoryPath, 'useSass', false);
    expect(getConfigFile(nodeDirectoryPath).useSass).toBe(false);
  });
  it('correctly updates collaborators', () => {
    const collaborators = [
      { githubUsername: 'new test', id: 'new test', role: 'new test' },
    ];
    updateConfigField(nodeDirectoryPath, 'collaborators', collaborators);
    expect(getConfigFile(nodeDirectoryPath).collaborators).toEqual(
      collaborators
    );
  });
});

describe('getConfigFile', () => {
  beforeEach(() => {
    createConfigFile(nodeDirectoryPath, config);
  });
  it('correctly returns an existing config', () => {
    expect(getConfigFile(nodeDirectoryPath)).toEqual(config);
  });
  it('throws an error when incorrect path is passed', () => {
    expect(() => getConfigFile(invalidDirectoryPath)).toThrow();
  });
});
