export const WEB_PUB_REPO_NAME = 'WEB_PUB_';

export interface File {
  filename: string;
  path: string;
}

export enum URLS {
  REDIRECT_URI = 'http://localhost/main_window',
  AUTHORIZE_URL = 'https://github.com/login/oauth/authorize',
  ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token',
}
export interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
}

export interface CommitDiff {
  filename: string;
  differences: string;
}

export interface Repository {
  name: string;
  author: string;
  url: string;
}
