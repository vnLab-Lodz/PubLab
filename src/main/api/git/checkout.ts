import { mainStore as store } from 'src/main';
import { MAIN_BRANCH } from '../../../shared/constants';
import { selectCurrentUserData } from '../../../shared/redux/slices/currentUserSlice';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import { selectRepoTree } from '../../../shared/redux/slices/repoStatusSlice';
import { LocalPublication, USER_ROLES } from '../../../shared/types';
import { IpcEventHandler } from '../../../shared/types/api';
import { isChanged } from '../../../shared/utils/repoStatus/statusChecks';
import { search as repoTreeSearch } from '../../../shared/utils/repoStatus/tree';
import createGitRepoHandler from '../../lib/gitRepoHandler';
import { createLogger } from '../../logger';

const checkout: IpcEventHandler = async () => {
  const logger = createLogger();
  const storeState = store.getState();
  const publication = activePublication(storeState) as LocalPublication;
  const repoHandler = createGitRepoHandler(publication);
  const user = selectCurrentUserData(storeState);
  const repoTree = selectRepoTree(storeState);
  if (!user) {
    logger.appendError('No user is logged in!');
    return;
  }

  if (!repoTree) {
    logger.appendError('No repo tree initialised!');
    return;
  }
  const changes = repoTreeSearch(repoTree, (node) => isChanged(node.status));

  if (changes) {
    await repoHandler.commit({
      message:
        'WIP\n\n[PubLab automatic commit]\nThis commit was created by PubLab to prevent data loss when switching branches.',
      authorUsername: user.nick,
    });
  }

  const userRole = publication.collaborators.find(
    (collaborator) => user.nick === collaborator.githubUsername
  )?.role;

  await repoHandler.checkout(
    userRole === USER_ROLES.EDITOR ? `editor-${user.nick}` : MAIN_BRANCH
  );
};
export default checkout;
