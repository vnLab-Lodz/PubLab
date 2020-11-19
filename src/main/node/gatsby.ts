import { exec } from 'child_process';
import * as fs from 'fs';

const logger = fs.createWriteStream('gatsby-cli-install.log', { flags: 'a' });
const tzOffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds

function writeLog(msg: string): void {
  let localISOTime = new Date(Date.now() - tzOffset).toISOString();
  logger.write(localISOTime.replace(/T/, ' ').replace(/\..+/, '') + ' ' + msg + '\n');
}

/**
 * Check if gatsby-cli is installed globally.
 * Rejects the promise if a command execution error occurs or JSON cannot be parsed.
 * @return {Promise<boolean>}
 */
function checkForGatsby(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    exec('npm list -g gatsby-cli --json', (error, stdout, stderr) => {
      if (error && stdout.trim() !== '{}') reject(error);

      let resultObj: any;
      try {
        resultObj = JSON.parse(stdout);
      } catch (e) {
        reject(stdout);
      }

      if (Object.keys(resultObj).length === 0 && resultObj.constructor === Object) resolve(false);
      else resolve(true);
    });
  });
}

/**
 * Checks if gatsby is already installed globally and if not installs it.
 * Rejects the promise if a command execution error occurs or JSON cannot be parsed.
 * @return {Promise<void>}
 */
export function installGatsby(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    checkForGatsby().then(
      (value) => {
        if (value) {
          writeLog('gatsby-cli is already installed. Skipping installation');
          resolve();
        } else {
          writeLog('gatsby-cli not installed. Installing...');
          exec('npm install -g gatsby-cli --quiet', (error, stdout, stderr) => {
            if (error) reject(error);

            writeLog(`package installer standard output: ${stdout}`);
            writeLog(`package installer error output: ${stderr}`);
            writeLog('Finished installation of gatsby-cli');
            resolve();
          });
        }
      },
      (reason) => reject(reason)
    );
  });
}
