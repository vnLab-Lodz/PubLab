import { mainStore as store } from 'src/main';
import createFileIO from 'src/main/lib/fileIO';
import { SETTINGS_FILE_PATH } from 'src/shared/constants';
import { setSettings, Settings } from 'src/shared/redux/slices/settingsSlice';
import { IpcEventHandler } from 'src/shared/types/api';

const read: IpcEventHandler = async () => {
  const io = createFileIO();
  const nextSettings = await io.readJSON<Settings>(SETTINGS_FILE_PATH);
  store.dispatch(setSettings(nextSettings));
};

export default read;
