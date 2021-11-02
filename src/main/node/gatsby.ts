import { exec } from 'child_process';
import { appendLog } from '../logger';

/**
 * Check if gatsby-cli is installed globally.
 * Rejects the promise if a command execution error occurs or JSON cannot be parsed.
 * @return {Promise<boolean>}
 */
export function checkForGatsby(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    exec('npm list -g gatsby-cli --json', (error, stdout) => {
      if (error && stdout.trim() !== '{}') reject(error);

      let resultObj: any;
      try {
        resultObj = JSON.parse(stdout);
      } catch (e) {
        reject(stdout);
      }

      if (
        Object.keys(resultObj).length === 0 &&
        resultObj.constructor === Object
      ) {
        appendLog('gatsby-cli not installed');
        resolve(false);
      } else {
        appendLog('gatsby-cli is already installed');
        resolve(true);
      }
    });
  });
}

/**
 * Checks if gatsby is already installed globally and if not installs it.
 * Rejects the promise if a command execution error occurs.
 * @return {Promise<void>}
 */
export function installGatsby(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    appendLog('Installing gatsby-cli...');

    exec('npm install -g gatsby-cli --quiet', (error, stdout, stderr) => {
      if (error) reject(error);

      appendLog(`package installer standard output: ${stdout}`);
      appendLog(`package installer error output: ${stderr}`);
      appendLog('Finished installation of gatsby-cli');
      resolve();
    });
  });
}
