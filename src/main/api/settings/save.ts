import { mainStore as store } from 'src/main';
import createFileIO from 'src/main/lib/fileIO';
import { setSettings, Settings } from 'src/shared/redux/slices/settingsSlice';
import { IpcEventHandler } from 'src/shared/types/api';
import { SETTINGS_FILE_PATH } from 'src/shared/constants';
import app from 'src/shared/utils/app';

type Params = Partial<Settings>;

const save: IpcEventHandler = async (_, params: Params) => {
  const io = createFileIO();
  const nextSettings = { ...store.getState().appSettings, ...params };
  store.dispatch(setSettings(nextSettings));
  await io.writeJSON(SETTINGS_FILE_PATH, {
    ...nextSettings,
    syncLocations: [],
  });

  const nick = store.getState().currentUser.data?.nick;
  if (!nick) return;

  const userData = app.getPath('userData');
  const syncLocationsPath = `${userData}/${nick}-sync-locations.json`;
  // TODO: encrypt the file
  await io.writeJSON(syncLocationsPath, nextSettings.syncLocations);
};

export default save;
