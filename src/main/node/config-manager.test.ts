import { createConfigFile } from './config-manager';

const fs = require('fs');

// * Be sure to add any temporary files created by tests to .gitignore
describe('createConfigFile', () => {
  it('create a config file under given directory', () => {
    createConfigFile(
      './src/main/node',
      'test name',
      'test description',
      [{ role: 'writer', username: 'username' }],
      'npm',
      'tag'
    );

    expect(() => {
      fs.readFileSync('./src/main/node/vn-pub.conf');
    }).not.toThrow();
  });
});
