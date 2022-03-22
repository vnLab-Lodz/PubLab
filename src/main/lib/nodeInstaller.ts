import child_process from 'child_process';
import util from 'util';
import { createLogger } from '../logger';

const exec = util.promisify(child_process.exec);

export interface NodeInstaller {
  verifyNodeInstallation: () => Promise<boolean>;
  installNode: () => Promise<void>;
}

const createNodeInstaller = (): NodeInstaller => {
  const logger = createLogger();

  return {
    async verifyNodeInstallation() {
      try {
        logger.appendLog('Verifying node installation...');
        const command = 'node -v';
        await exec(command);
        logger.appendLog('Node is installed globally');
        return true;
      } catch (error) {
        logger.appendLog('Node is not installed globally');
        logger.appendError(
          `Verification of node installation output: ${error}`
        );
        return false;
      }
    },
    async installNode() {
      throw new Error('Installation of node is not implemented yet');
    },
  };
};

export default createNodeInstaller;
