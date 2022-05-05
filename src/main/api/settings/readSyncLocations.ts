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
  let syncLocations: SyncLocations = [];
  let locationsCount = 0;

  try {
    syncLocations = await io.readJSON<SyncLocations>(syncLocationsPath);
    locationsCount = syncLocations.length;
  } catch (error: any) {
    logger.appendError(error);
    logger.appendLog('No sync locations found. Creating new from user data.');
  } finally {
    if (!syncLocations.some(hasLocation('Profile'))) {
      syncLocations.unshift({ name: 'Profile', enabled: true });
    }

    user.organizations.forEach((name) => {
      if (!syncLocations.some(hasLocation(name))) {
        syncLocations.push({ name, enabled: true });
      }
    });

    store.dispatch(setSettings({ ...settings, syncLocations }));
    if (locationsCount !== syncLocations.length) {
      await io.writeJSON(syncLocationsPath, syncLocations);
    }
  }
};

function hasLocation(name: string) {
  return (location: SyncLocations[0]) => location.name === name;
}

export default readSyncLocations;
