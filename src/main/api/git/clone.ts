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

const clone: IpcEventHandler = async (
  _,
  id: string,
  name: string,
  url: string
) => {
  const logger = createLogger();
  const { defaultDirPath } = store.getState().appSettings;
  const username = store.getState().currentUser.auth.accessToken?.value;
  const dir = path.join(defaultDirPath, name);

  logger.appendLog(`Cloning repo from ${url} to ${dir}`);

  // https://isomorphic-git.org/docs/en/onAuth
  const onAuth: AuthCallback = () => (username ? { username } : undefined);

  const onAuthFailure: AuthFailureCallback = (message) => {
    logger.appendError(message);
    // TODO: Use translations
    store.dispatch(sendNotification({ type: 'error', message }));
  };

  const onProgress: ProgressCallback = (e) => {
    // TODO: Implement loaders
    console.log(e.phase);
    console.log(e.loaded);
    console.log(e.total);
  };

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

  store.dispatch(convertPublicationToLocal({ id, dir }));
};

export default clone;
