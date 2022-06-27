import chokidar from 'chokidar';
import { mainStore as store } from 'src/main';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { LocalPublication } from '../../../shared/types';
import { IpcEventHandler } from '../../../shared/types/api';
import { createLogger } from '../../logger';
import { handleUpdateRequest } from '../git/status';

let watcher: chokidar.FSWatcher | undefined;

console.log('executed');

const initializeWatcher = (path: string) => {
  watcher = chokidar.watch(path, { ignoreInitial: true });
  watcher.on('all', (ev, pth) => {
    console.log(ev, pth);
    handleUpdateRequest();
  });
};

export const start: IpcEventHandler = async () => {
  console.log('watch:start');
  const logger = createLogger();
  const publication = activePublication(store.getState()) as LocalPublication;
  if (!publication?.dirPath) {
    logger.appendError('No active publication or directory path is undefined');
    return;
  }
  if (watcher) await watcher.close();
  initializeWatcher(publication.dirPath);
};

export const stop: IpcEventHandler = async () => {
  console.log('watch:stop');
  console.log(watcher?.getWatched());
  if (!watcher) return;
  await watcher.close();
  console.log('closed', watcher.getWatched());
  watcher = undefined;
  console.log('closed', watcher);
};
