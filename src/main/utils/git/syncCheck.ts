import createGitRepoHandler from 'src/main/lib/gitRepoHandler';
import { LocalPublication } from 'src/shared/types';
import { activePublication } from '../../../shared/redux/slices/loadPublicationsSlice';
import {
  selectMainBranchSync,
  setMainBranchStatus,
  setWasUserNotified,
} from '../../../shared/redux/slices/mainBranchSyncSlice';
import { sendNotification } from '../../../shared/redux/slices/notificationsSlice';
import compareBranches from './compareBranches';

const syncCheck = async (store: any) => {
  const publication = activePublication(store.getState()) as LocalPublication;
  if (!publication) return;

  const gitHandler = createGitRepoHandler(publication);
  gitHandler.fetch();

  const state = selectMainBranchSync(store.getState());
  const status = await compareBranches({ useRemote: true });

  if (
    status.ahead &&
    (!state.wasUserNotified || status.ahead > state.status.ahead)
  ) {
    store.dispatch(setWasUserNotified(true));
    store.dispatch(
      sendNotification({
        i18n: { key: 'notifications.new_changes' },
        type: 'info',
      })
    );
  }

  store.dispatch(setMainBranchStatus(status));
};

export default syncCheck;
