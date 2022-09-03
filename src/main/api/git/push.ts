import fs from 'fs';
import http from 'isomorphic-git/http/node';
import { activePublication } from 'src/shared/redux/slices/loadPublicationsSlice';
import { createLogger } from 'src/main/logger';
import { IpcEventHandler } from 'src/shared/types/api';
import { LocalPublication } from 'src/shared/types/';
import { mainStore as store } from 'src/main';
import { sendNotification } from 'src/shared/redux/slices/notificationsSlice';
import git, { AuthCallback, AuthFailureCallback } from 'isomorphic-git';
import { addLoader, removeLoader } from 'src/shared/redux/slices/loadersSlice';

interface Options {
  loaderId: string;
  branchRef?: string;
}

const push: IpcEventHandler = async (_, { loaderId, branchRef }: Options) => {
  const logger = createLogger();
  const { dirPath } = activePublication(store.getState()) as LocalPublication;
  const username = store.getState().currentUser.data?.nick;
  const token = store.getState().currentUser.auth.accessToken?.value;
  const ref = branchRef || username;

  // https://isomorphic-git.org/docs/en/onAuth
  const onAuth: AuthCallback = () => (token ? { username: token } : undefined);

  const onAuthFailure: AuthFailureCallback = (message) => {
    logger.appendError(message);
    store.dispatch(
      sendNotification({
        type: 'error',
        i18n: { key: 'notifications.github_clone_auth_failed' },
      })
    );
  };

  try {
    logger.appendLog(`Pushing repository in ${dirPath}`);
    store.dispatch(
      addLoader({
        id: loaderId,
        i18n: { key: 'loaders.pushing', params: { dir: dirPath } },
      })
    );

    await git.push({
      fs,
      http,
      remoteRef: ref,
      dir: dirPath,
      onAuth,
      onAuthFailure,
    });

    store.dispatch(
      sendNotification({
        type: 'success',
        autoDismiss: true,
        delay: 3000,
        i18n: {
          key: 'notifications.push_success',
        },
      })
    );
  } catch (error: any) {
    logger.appendError(error);
    store.dispatch(
      sendNotification({ type: 'error', i18n: { key: 'notifications.error' } })
    );
  } finally {
    store.dispatch(removeLoader(loaderId));
  }
};

export default push;
