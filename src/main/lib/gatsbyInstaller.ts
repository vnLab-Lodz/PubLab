import child_process from 'child_process';
import util from 'util';
import { createLogger } from '../logger';

const exec = util.promisify(child_process.exec);

export interface GatsbyInstaller {
  verifyGatsbyCliInstallation: () => Promise<boolean>;
  installGatsbyCli: () => Promise<void>;
}

const createGatsbyInstaller = (): GatsbyInstaller => {
  const logger = createLogger();

  return {
    async verifyGatsbyCliInstallation() {
      try {
        logger.appendLog('Verifying gatsby-cli installation...');
        const command = 'npm list -g gatsby-cli --json';
        const { stdout } = await exec(command);
        const result = JSON.parse(stdout);
        if (typeof result === 'object' && Object.keys(result).length === 0) {
          logger.appendLog('gatsby-cli not installed');
          return false;
        }

        logger.appendLog('gatsby-cli is already installed');
        return true;
      } catch (error) {
        logger.appendError(
          `Verification of gatsby-cli installation output: ${error}`
        );
        throw new Error(
          'Placeholder for gatsby-cli installation verification error'
        );
      }
    },
    async installGatsbyCli() {
      try {
        logger.appendLog('Installing gatsby-cli...');
        const command = 'npm install -g gatsby-cli --quiet';
        const { stdout, stderr } = await exec(command);
        logger.appendLog(`Package installer standard output: ${stdout}`);
        logger.appendLog(`Package installer error output: ${stderr}`);
        logger.appendLog('Finished installation of gatsby-cli');
      } catch (error) {
        logger.appendError(`Gatsby-cli installation output: ${error}`);
        throw new Error('Placeholder for gatsby-cli installation error');
      }
    },
  };
};

export default createGatsbyInstaller;
