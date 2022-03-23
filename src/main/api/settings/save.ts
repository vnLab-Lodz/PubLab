import { mainStore as store } from 'src/main';
import createFileIO from 'src/main/lib/fileIO';
import { SETTINGS_FILE_PATH } from 'src/shared/constants';
import { setSettings, Settings } from 'src/shared/redux/slices/settingsSlice';
import { IpcEventHandler } from 'src/shared/types/api';

type Params = Partial<Settings>;

const save: IpcEventHandler = async (_, params: Params) => {
  const io = createFileIO();
  const nextSettings = { ...store.getState().appSettings, ...params };
  store.dispatch(setSettings(nextSettings));
  await io.writeJSON(SETTINGS_FILE_PATH, nextSettings);
};

export default save;
