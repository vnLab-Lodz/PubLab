import fs from 'fs';
import http from 'isomorphic-git/http/node';
import path from 'path';
import { convertPublicationToLocal } from 'src/shared/redux/slices/loadPublicationsSlice';
import { createLogger } from 'src/main/logger';
import { IpcEventHandler } from 'src/shared/types/api';
import { mainStore as store } from 'src/main';
import { sendNotification } from 'src/shared/redux/slices/notificationsSlice';
import git, {
  AuthCallback,
  AuthFailureCallback,
  ProgressCallback,
} from 'isomorphic-git';
import {
  addLoader,
  modifyLoader,
  removeLoader,
} from 'src/shared/redux/slices/loadersSlice';

interface Options {
  loaderId: string;
}

const clone: IpcEventHandler = async (
  _,
  id: string,
  name: string,
  url: string,
  { loaderId }: Options
) => {
  const logger = createLogger();
  const { defaultDirPath } = store.getState().appSettings;
  const username = store.getState().currentUser.auth.accessToken?.value;
  const dir = path.join(defaultDirPath, name);

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

  const onProgress: ProgressCallback = (e) => {
    // TODO: Possible use of translations
    // Compressing objects | Resolving deltas | Updating workdir
    const value = e.total ? `${e.loaded}/${e.total} ${e.phase}` : e.phase;
    store.dispatch(modifyLoader({ id: loaderId, key: 'message', value }));
  };

  try {
    logger.appendLog(`Cloning repo from ${url} to ${dir}`);
    store.dispatch(
      addLoader({ id: loaderId, message: `Cloning repo from ${url} to ${dir}` })
    );

    await git.clone({
      fs,
      http,
      url,
      dir,
      depth: 10,
      singleBranch: true,
      onProgress,
      onAuth,
      onAuthFailure,
    });

    store.dispatch(
      sendNotification({
        type: 'success',
        i18n: {
          key: 'notifications.clone_success',
          params: { name, dir },
        },
      })
    );
    store.dispatch(convertPublicationToLocal({ id, dir }));
  } catch (error: any) {
    logger.appendError(error);
    store.dispatch(
      sendNotification({ type: 'error', i18n: { key: 'notifications.error' } })
    );
  } finally {
    store.dispatch(removeLoader(loaderId));
  }
};

export default clone;
