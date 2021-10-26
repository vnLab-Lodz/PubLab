export interface Repository {
  name: string;
  author: string;
  url: string;
}

export interface File {
  filename: string;
  path: string;
}

export enum URLS {
  REDIRECT_URI = 'http://localhost/main_window',
  AUTHORIZE_URL = 'https://github.com/login/oauth/authorize',
  ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token',
}

export enum ENDPOINT_PARAMS {
  CLIENT_ID = 'client_id',
  REDIRECT_URI = 'redirect_uri',
}

export const WEB_PUB_REPO_NAME = 'WEB_PUB';
