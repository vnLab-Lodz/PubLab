import { Octokit } from '@octokit/rest';
import { mainStore as store } from 'src/main';
import { IpcEventHandler } from 'src/shared/types/api';
import { createLogger } from '../../logger';

const getPublicUserData: IpcEventHandler = async (_, username: string) => {
  try {
    const token = store.getState().currentUser.auth.accessToken?.value;
    const octokit = new Octokit({ auth: token });
    const userData = await octokit.rest.users.getByUsername({ username });
    return userData;
  } catch (error) {
    const logger = createLogger();
    logger.appendError(
      `Failed fetching GitHub data of "${username}" \nError:\n ${error}`
    );
    return Promise.reject(error);
  }
};

export default getPublicUserData;
