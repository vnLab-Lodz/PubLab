import { mainStore as store } from 'src/main';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { LocalPublication } from '../../../shared/types';
import { IpcEventHandler } from '../../../shared/types/api';
import createGitRepoHandler from '../../lib/gitRepoHandler';

const currentBranch: IpcEventHandler = async () => {
  const publication = activePublication(store.getState()) as LocalPublication;
  const repoHandler = createGitRepoHandler(publication);
  await repoHandler.currentBranch();
};

export default currentBranch;
