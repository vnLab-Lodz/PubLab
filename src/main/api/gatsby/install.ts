import createGatsbyInstaller from 'src/main/lib/gatsbyInstaller';
import { createLogger } from 'src/main/logger';
import { IpcEventHandler } from 'src/shared/types/api';

const install: IpcEventHandler = async () => {
  try {
    const installer = createGatsbyInstaller();
    await installer.installGatsbyCli();
  } catch (error: any) {
    const logger = createLogger();
    logger.appendError(
      `Gatsby CLI installation failed with error: ${error.message}`
    );
  }
};

export default install;
