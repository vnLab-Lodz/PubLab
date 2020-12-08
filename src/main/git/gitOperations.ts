import axios from 'axios';
import { Repository, WEB_PUB_REPO_NAME } from './gitTypes';

/**
 * return array of objects with name of repository, author of repository and url to repository
 * @param accessToken - accessToken
 */
export function getUserRepositories(accessToken: string): Repository[] {
  const repositories: Repository[] = [];
  axios({
    method: 'GET',
    headers: {
      Authorization: 'token ' + accessToken,
    },
    url: 'https://api.github.com/user/repos',
  }).then((data) => {
    console.log(data);
    data.data.forEach((repo: any) => {
      if (repo.name.indexOf(WEB_PUB_REPO_NAME) !== -1) {
        repositories.push({
          name: repo.name,
          author: repo.owner.login,
          url: repo.url,
        } as Repository);
      }
    });
    console.log(repositories);
  });
  return repositories;
}

/**
 * creates new repository on authorized user account
 * @param accessToken - accessToken
 * @param repoName - name of the repository
 * @param description - description of repository(optional)
 */
export function createNewRepository(
  accessToken: string,
  repoName: string,
  description?: string
): void {
  axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'token ' + accessToken,
    },
    url: 'https://api.github.com/user/repos',
    data: {
      name: WEB_PUB_REPO_NAME + repoName,
      description: description,
      homepage: 'https://github.com',
      private: true,
      has_issues: true,
      has_projects: true,
      has_wiki: true,
    },
  }).then((data) => {
    console.log(data);
  });
}
