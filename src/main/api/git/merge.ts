import { mainStore as store } from 'src/main';
import { selectCurrentUser } from '../../../shared/redux/slices/currentUserSlice';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { LocalPublication } from '../../../shared/types';
import { IpcEventHandler } from '../../../shared/types/api';
import createGitRepoHandler from '../../lib/gitRepoHandler';
import { createLogger } from '../../logger';

const merge: IpcEventHandler = async (
  _,
  branchToMerge: string,
  targetBranch?: string
) => {
  const logger = createLogger();
  const user = selectCurrentUser(store.getState()).data;
  const token = selectCurrentUser(store.getState()).auth.accessToken?.value;

  if (!user || !token) {
    const msg = 'No active user';
    logger.appendError(msg);
    throw new Error(msg);
  }

  const publication = activePublication(store.getState()) as LocalPublication;
  const repoHandler = createGitRepoHandler(publication);
  await repoHandler.mergeAndSync(
    user.nick,
    token,
    branchToMerge,
    targetBranch || (await repoHandler.currentBranch())!
  );
};

export default merge;
