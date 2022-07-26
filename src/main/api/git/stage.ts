import fs from 'fs';
import { updateIndex, resetIndex } from 'isomorphic-git';
import { mainStore as store } from 'src/main';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { LocalPublication } from '../../../shared/types';
import { GitRepoTreeItem, IpcEventHandler } from '../../../shared/types/api';
import { absoluteToGitPath } from '../../../shared/utils/paths';
import { createLogger } from '../../logger';

const stage: IpcEventHandler = async (
  _,
  action: 'stage' | 'unstage',
  items: GitRepoTreeItem[]
) => {
  const logger = createLogger();
  const publication = activePublication(store.getState()) as LocalPublication;
  if (!publication?.dirPath) {
    logger.appendError('No active publication or directory path is undefined');
    return;
  }

  await Promise.all(
    items.map(async (item) => {
      const filepath = absoluteToGitPath(item.filepath, publication.dirPath);
      if (action === 'stage')
        await updateIndex({
          fs,
          dir: publication.dirPath,
          filepath,
          add: true,
          remove: !item.status.workdir,
        });
      else if (action === 'unstage')
        await resetIndex({
          fs,
          dir: publication.dirPath,
          filepath,
        });
    })
  );
};

export default stage;
