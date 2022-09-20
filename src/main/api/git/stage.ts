import { mainStore as store } from 'src/main';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { LocalPublication } from '../../../shared/types';
import { GitRepoTreeItem, IpcEventHandler } from '../../../shared/types/api';
import createGitRepoHandler from '../../lib/gitRepoHandler';

const stage: IpcEventHandler = async (
  _,
  action: 'stage' | 'unstage',
  items: GitRepoTreeItem[]
) => {
  const publication = activePublication(store.getState()) as LocalPublication;
  const handler = createGitRepoHandler(publication);

  if (action === 'stage') await handler.stage(items);
  if (action === 'unstage') await handler.unstage(items);
};

export default stage;
