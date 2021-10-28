import { exec } from 'child_process';
import { appendLog } from '../logger';

/**
 * Check if node is installed globally.
 * Promise returns false if a command execution error occurs or node is not installed globally.
 * @return {Promise<boolean>}
 */
export function checkForNode(): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    exec('node -v', (error) => {
      if (error) {
        appendLog('node is not installed globally');
        resolve(false);
      } else {
        appendLog('node is installed globally');
        resolve(true);
      }
    });
  });
}

/**
 * Checks if node is already installed globally and if not installs it.
 * Rejects the promise if a command execution error occurs or node verification fails.
 * @return {Promise<void>}
 */
export function installNode(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    appendLog('Installing node...');

    checkForNode()
      .then(_ => {
        let version = 'v17.0.1';
        exec(`msiexec.exe /i https://nodejs.org/dist/${version}/node-${version}-x64.msi /quiet`, (error, stdout, stderr) => {
          if (error) reject(error);
          appendLog(`Launched installation of node. Version: ${version}`);
          resolve();
        });
      })
      .catch(error => {
        appendLog('Cannot install node - an error occurred during verification of its installation.');
        resolve(error);
      });
  });
}
