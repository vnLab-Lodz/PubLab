import { IpcEventHandler } from 'src/shared/types/api';
import { mainStore as store } from 'src/main';
import createGitHubHandler from '../../lib/gitHubHandler';

const getPublicUserData: IpcEventHandler = async (_, username: string) => {
  const token = store.getState().currentUser.auth.accessToken?.value;
  if (!token) {
    throw new Error('No user is logged in!');
  }
  const gitHubHandler = createGitHubHandler(token);
  return gitHubHandler.getPublicUserData(username);
};

export default getPublicUserData;
