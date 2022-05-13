import { IpcEventHandler } from 'src/shared/types/api';
import createConfigFileHandler, {
  Config,
} from '../../lib/configurationFileHandler';

const updateConfig: IpcEventHandler = async (
  _,
  dirPath: string,
  changes: Partial<Config>
) => {
  const configHandler = createConfigFileHandler({ dirPath });
  const oldConfig = await configHandler.getConfig();
  await configHandler.setConfig({ ...oldConfig, ...changes });
};

export default updateConfig;
