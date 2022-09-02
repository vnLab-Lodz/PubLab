import fs from 'fs';
import http from 'isomorphic-git/http/node';
import { IpcEventHandler } from 'src/shared/types/api';
import { mainStore as store } from 'src/main';
import { activePublication } from 'src/shared/redux/slices/loadPublicationsSlice';
import git, { AuthCallback } from 'isomorphic-git';
import createGitHubHandler from '../../lib/gitHubHandler';
import { LocalPublication } from '../../../shared/types';

const createRepo: IpcEventHandler = async (_, name: string) => {
  const token = store.getState().currentUser.auth.accessToken?.value;
  const username = store.getState().currentUser.data?.nick;
  if (!token || !username) throw new Error('No user is logged in!');

  const gitHubHandler = createGitHubHandler(token);
  const { dirPath } = activePublication(store.getState()) as LocalPublication;

  await gitHubHandler.createRepo(name);
  const repo = await gitHubHandler.getRepo({ name, owner: username });

  const onAuth: AuthCallback = () => (token ? { username: token } : undefined);
  await git.push({
    fs,
    http,
    url: repo.data.clone_url,
    remoteRef: 'main',
    dir: dirPath,
    onAuth,
  });
  await gitHubHandler.createBranch(`editor-${username}`, {
    name,
    owner: username,
  });
};

export default createRepo;
