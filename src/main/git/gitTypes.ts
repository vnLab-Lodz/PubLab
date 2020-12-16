export interface File {
    filename: string;
    path: string;
}

export interface Author {
    name: string,
    email: string
}

export enum Url {
    REDIRECT_URI = 'http://localhost/main_window',
    AUTHORIZE_URL = 'https://github.com/login/oauth/authorize',
    ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token',
}

export enum EndPointParameters {
    CLIENT_ID = "client_id",
    REDIRECT_URI ="redirect_uri",
    SCOPE = "scope"
}

export enum ScopeParamValues {
    REPO = "repo"
}

export interface Commit {
    sha: string,
    message: string,
    author: string,
    date: string
}

export interface CommitDiff {
    filename: string,
    differences: string
}
