import { mainStore as store } from 'src/main';
import { activePublication } from 'src/shared/redux/slices/loadPublicationsSlice';
import path from 'path';
import createGitHubHandler from '../../lib/gitHubHandler';
import { LocalPublication } from '../../../shared/types';
import { IpcEventHandler } from '../../../shared/types/api';

const updateCollaborators: IpcEventHandler = async () => {
  const publication = activePublication(store.getState()) as LocalPublication;
  const username = store.getState().currentUser.data?.nick;
  const token = store.getState().currentUser.auth.accessToken?.value;
  if (!publication) {
    throw new Error('No active publication!');
  }
  if (!token || !username) {
    throw new Error('No user is logged in!');
  }
  const githubHandler = createGitHubHandler(token);
  await githubHandler.updateCollaborators(publication.collaborators, {
    owner: username,
    name: path.basename(publication.dirPath),
  });
};

export default updateCollaborators;
