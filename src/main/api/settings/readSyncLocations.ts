import { mainStore as store } from 'src/main';
import createFileIO from 'src/main/lib/fileIO';
import { createLogger } from 'src/main/logger';
import { IpcEventHandler } from 'src/shared/types/api';
import app from 'src/shared/utils/app';
import {
  setSettings,
  SyncLocations,
} from 'src/shared/redux/slices/settingsSlice';

const readSyncLocations: IpcEventHandler = async () => {
  const logger = createLogger();
  const io = createFileIO();
  const user = store.getState().currentUser.data;
  if (!user || !user.nick) return;

  const userData = app.getPath('userData');
  const syncLocationsPath = `${userData}/${user.nick}-sync-locations.json`;
  const settings = store.getState().appSettings;

  try {
    const syncLocations = await io.readJSON<SyncLocations>(syncLocationsPath);
    user.organizations.forEach((org) => {
      if (!syncLocations.find((l) => l.name === org)) {
        syncLocations.push({ name: org, enabled: true });
      }
    });
    store.dispatch(setSettings({ ...settings, syncLocations }));
  } catch (error: any) {
    logger.appendError(error);
    logger.appendLog('No sync locations found. Creating new from user data.');
    const syncLocations: SyncLocations = [
      { name: 'Profile', enabled: true },
      ...user.organizations.map((org) => ({ name: org, enabled: false })),
    ];
    store.dispatch(setSettings({ ...settings, syncLocations }));
  }
};

export default readSyncLocations;
