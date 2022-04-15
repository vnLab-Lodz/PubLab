import { mainStore as store } from 'src/main';
import createFileIO from 'src/main/lib/fileIO';
import { createLogger } from 'src/main/logger';
import { SETTINGS_FILE_PATH } from 'src/shared/constants';
import { setSettings, Settings } from 'src/shared/redux/slices/settingsSlice';
import { IpcEventHandler } from 'src/shared/types/api';

const read: IpcEventHandler = async () => {
  const io = createFileIO();
  const logger = createLogger();

  try {
    const nextSettings = await io.readJSON<Settings>(SETTINGS_FILE_PATH);
    store.dispatch(setSettings(nextSettings));
  } catch (error) {
    logger.appendLog('No app settings found, using defaults.');
  }
};

export default read;
