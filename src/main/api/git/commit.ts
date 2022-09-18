import { mainStore as store } from 'src/main';
import { selectCurrentUserData } from '../../../shared/redux/slices/currentUserSlice';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { LocalPublication } from '../../../shared/types';
import { IpcEventHandler } from '../../../shared/types/api';
import createGitRepoHandler from '../../lib/gitRepoHandler';
import { createLogger } from '../../logger';

const commit: IpcEventHandler = async (_, message: string) => {
  const logger = createLogger();
  const publication = activePublication(store.getState()) as LocalPublication;
  const user = selectCurrentUserData(store.getState());
  const repoHandler = createGitRepoHandler(publication);

  if (!user) {
    logger.appendError('No user is logged in!');
    return;
  }
  await repoHandler.commit({ message, authorUsername: user.nick });
};

export default commit;
