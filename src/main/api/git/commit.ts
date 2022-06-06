import fs from 'fs';
import { commit as gitCommit } from 'isomorphic-git';
import { mainStore as store } from 'src/main';
import { selectCurrentUserData } from '../../../shared/redux/slices/currentUserSlice';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { LocalPublication } from '../../../shared/types';
import { IpcEventHandler } from '../../../shared/types/api';
import { createLogger } from '../../logger';

const commit: IpcEventHandler = async (_, message: string) => {
  const logger = createLogger();
  const publication = activePublication(store.getState()) as LocalPublication;
  const user = selectCurrentUserData(store.getState());
  if (!publication?.dirPath) {
    logger.appendError('No active publication or directory path is undefined');
    return;
  }
  if (!user) {
    logger.appendError('No user is logged in!');
    return;
  }
  await gitCommit({
    fs,
    dir: publication.dirPath,
    message,
    author: { name: user.nick },
  });
};

export default commit;
