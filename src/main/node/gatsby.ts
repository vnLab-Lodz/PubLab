import { exec } from 'child_process';
import * as winston from 'winston';

const myFormat = winston.format.printf(
  ({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  }
);

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), myFormat),
  transports: [
    new winston.transports.File({ filename: 'logs/gatsby-cli-install.log' }),
  ],
});

/**
 * Check if gatsby-cli is installed globally.
 * @return {Promise<boolean>}
 */
function checkForGatsby(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    exec('npm list -g gatsby-cli --json', (error, stdout, stderr) => {
      if (error) reject(error);

      let resultObj: any = JSON.parse(stdout);

      if (
        Object.keys(resultObj).length === 0 &&
        resultObj.constructor === Object
      )
        resolve(false);
      else resolve(true);
    });
  });
}

/**
 * Checks if gatsby is already installed globally and if not installs it.
 * @return {Promise<void>}
 */
export function installGatsby(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    checkForGatsby().then(
      (value) => {
        if (value) {
          logger.info('gatsby-cli is already installed. Skipping installation');
          resolve();
        } else {
          logger.info('gatsby-cli not installed. Installing...');
          exec('npm install -g gatsby-cli --quiet', (error, stdout, stderr) => {
            if (error) reject(error);

            logger.info(`package installer standard output: ${stdout}`);
            logger.error(`package installer error output: ${stderr}`);
            logger.info('Finished installation of gatsby-cli');
            resolve();
          });
        }
      },
      (reason) => reject(reason)
    );
  });
}
