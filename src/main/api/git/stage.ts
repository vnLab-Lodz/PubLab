import fs from 'fs';
import { updateIndex, resetIndex } from 'isomorphic-git';
import { mainStore as store } from 'src/main';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { LocalPublication } from '../../../shared/types';
import { GitRepoTreeItem, IpcEventHandler } from '../../../shared/types/api';
import { createLogger } from '../../logger';

const stage: IpcEventHandler = async (
  _,
  action: 'stage' | 'unstage',
  item: GitRepoTreeItem
) => {
  const logger = createLogger();
  const publication = activePublication(store.getState()) as LocalPublication;
  if (!publication?.dirPath) {
    logger.appendError('No active publication or directory path is undefined');
    return;
  }

  if (action === 'stage')
    await updateIndex({
      fs,
      dir: publication.dirPath,
      filepath: item.filepath,
      add: true,
      remove: !item.status.workdir,
    });
  else if (action === 'unstage')
    await resetIndex({
      fs,
      dir: publication.dirPath,
      filepath: item.filepath,
    });
};

export default stage;
