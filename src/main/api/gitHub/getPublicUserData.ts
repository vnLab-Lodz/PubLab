import { IpcEventHandler } from 'src/shared/types/api';
import createGitHubHandler from '../../lib/gitHub';

const getPublicUserData: IpcEventHandler = async (_, username: string) => {
  const gitHubHandler = createGitHubHandler();
  return gitHubHandler.getPublicUserData(username);
};

export default getPublicUserData;
