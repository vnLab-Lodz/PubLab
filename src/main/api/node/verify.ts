import createNodeInstaller from 'src/main/lib/nodeInstaller';
import { IpcEventHandler } from 'src/shared/types/api';

const verify: IpcEventHandler = async () => {
  const installer = createNodeInstaller();
  const isNodeInstalled = await installer.verifyNodeInstallation();
  return isNodeInstalled;
};

export default verify;
