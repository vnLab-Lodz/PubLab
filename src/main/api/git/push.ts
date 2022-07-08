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
import app from '../../../shared/utils/app';

interface Options {
  loaderId: string;
  remoteRef?: string;
}

const push: IpcEventHandler = async (_, { loaderId, remoteRef }: Options) => {
  const logger = createLogger();
  const { dirPath } = activePublication(store.getState()) as LocalPublication;
  const username = store.getState().currentUser.auth.accessToken?.value;

  // https://isomorphic-git.org/docs/en/onAuth
  const onAuth: AuthCallback = () => (username ? { username } : undefined);

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
      remoteRef: app.isPackaged ? remoteRef : 'publab-dev-tests',
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