import { Octokit, RestEndpointMethodTypes } from '@octokit/rest';
import { mainStore as store } from 'src/main';
import { createLogger } from '../logger';

export interface GitHubHandler {
  getPublicUserData: (
    username: string
  ) => Promise<RestEndpointMethodTypes['users']['getByUsername']['response']>;
}

const createGitHubHandler = (): GitHubHandler => {
  const logger = createLogger();
  const token = store.getState().currentUser.auth.accessToken?.value;
  const octokit = new Octokit({ auth: token });

  return {
    getPublicUserData: async (username: string) => {
      try {
        const userData = await octokit.rest.users.getByUsername({ username });
        return userData;
      } catch (error) {
        logger.appendError(
          `Failed fetching GitHub data of "${username}" \nError:\n ${error}`
        );
        return Promise.reject(error);
      }
    },
  };
};

export default createGitHubHandler;
