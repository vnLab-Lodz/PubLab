import createGatsbyInstaller from 'src/main/lib/gatsbyInstaller';
import { createLogger } from 'src/main/logger';
import { IpcEventHandler } from 'src/shared/types/api';

const verify: IpcEventHandler = async () => {
  try {
    const installer = createGatsbyInstaller();
    return await installer.verifyGatsbyCliInstallation();
  } catch (error: any) {
    const logger = createLogger();
    logger.appendError(
      `Gatsby CLI installation verification failed with error: ${error.message}`
    );
    return false;
  }
};

export default verify;
